import type { SentryIssue, SentryIssueAlertWebhook } from "./types";
import { safeString } from "./utils";

export interface SlackPostArgs {
	env: Env;
	channel: string;
	webhook?: SentryIssueAlertWebhook;
}

export async function postSentryAlertToSlack(
	args: SlackPostArgs,
): Promise<Response | null> {
	const { env, webhook } = args;

	if (!webhook) {
		console.warn("Missing Slack webhook");
		return null;
	}

	const token = env.SLACK_BOT_TOKEN;
	const channel = args.channel;

	if (!token || !channel) {
		console.warn("Missing Slack bot token or channel");
		return null;
	}

	const issue: SentryIssue = webhook.data.issue;
	const level: string | undefined = issue.level;
	const environment: string | undefined = "unknown";
	const title: string = safeString(
		issue.title ?? webhook.data.triggered_rule ?? "",
	);
	const culprit: string = safeString(issue.culprit ?? "");
	const project: string = safeString(
		issue.project?.slug ?? issue.project?.name ?? "",
	);
	const formatted: string = safeString(
		(issue.metadata as any)?.value ?? (issue.metadata as any)?.filename ?? "",
	);
	// Determine level emoji and color
	const getLevelEmoji = (level?: string) => {
		switch (level) {
			case "error":
				return "🔴";
			case "warning":
				return "🟡";
			case "info":
				return "🔵";
			case "debug":
				return "⚪";
			default:
				return "⚫";
		}
	};

	const levelEmoji = getLevelEmoji(level);
	const isError = level === "error";

	// Get Sentry issue URL - prefer url, then web_url, then permalink
	const sentryUrl = issue.web_url || issue.url || issue.permalink;

	// Format timestamp from issue
	const timestamp = issue.lastSeen
		? new Date(issue.lastSeen).toLocaleString()
		: issue.firstSeen
		? new Date(issue.firstSeen).toLocaleString()
		: "Unknown";

	// Issue payload does not include release or user
	const release = "Unknown";
	const userInfo = "Anonymous";

	const blocks = [
		// Header with level emoji and title
		{
			type: "header",
			text: {
				type: "plain_text",
				text: `${levelEmoji} ${title}`,
			},
		},

		// Main content section with key details
		{
			type: "section",
			fields: [
				{
					type: "mrkdwn",
					text: `*Level:*\n${levelEmoji} ${
						safeString(level?.toUpperCase() || "UNKNOWN")
					}`,
				},
				{
					type: "mrkdwn",
					text: `*Environment:*\n${safeString(environment)}`,
				},
				{
					type: "mrkdwn",
					text: `*Project:*\n${safeString(project)}`,
				},
				{
					type: "mrkdwn",
					text: `*Release:*\n${safeString(release)}`,
				},
			],
		},

		// User and timestamp info
		{
			type: "section",
			fields: [
				{
					type: "mrkdwn",
					text: `*User:*\n${safeString(userInfo)}`,
				},
				{
					type: "mrkdwn",
					text: `*Time:*\n${timestamp}`,
				},
			],
		},

		// Message content (if available)
		...(formatted && formatted !== "-"
			? [{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*Message:*\n\`\`\`${safeString(formatted)}\`\`\``,
				},
			}]
			: []),

		// Culprit (if available)
		...(culprit
			? [{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*Location:*\n\`${safeString(culprit)}\``,
				},
			}]
			: []),

		// Sentry link button
		...(sentryUrl
			? [{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "View in Sentry",
							emoji: true,
						},
						url: sentryUrl,
						style: isError ? "danger" : "primary",
					},
				],
			}]
			: []),
	] as const;

	const response = await fetch("https://slack.com/api/chat.postMessage", {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ channel, blocks }),
	});

	return response;
}
