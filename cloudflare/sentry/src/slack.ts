import type { SentryEvent, SentryIssueAlertWebhook } from "./types";
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

	if (!webhook) return null;

	const token = env.SLACK_BOT_TOKEN;
	const channel = args.channel;

	if (!token || !channel) return null;

	const event: SentryEvent = webhook.data.event;
	const level: string | undefined = event.level;
	const environment: string | undefined =
		event.tags?.find?.((t: [string, string]) => t[0] === "environment")?.[1] ??
			"unknown";
	const email: string | undefined = (event as any).user?.email ??
		(event as any).user?.username ?? (event as any).user?.ip_address;
	const title: string = safeString(event.title ?? webhook.data.triggered_rule);
	const culprit: string = safeString(event.culprit ?? "");
	const project: string = safeString(String(event.project ?? ""));
	const formatted: string = safeString(
		event.message ?? event.metadata?.value ?? event.metadata?.filename ?? "",
	);
	// Determine level emoji and color
	const getLevelEmoji = (level?: string) => {
		switch (level) {
			case "error": return "🔴";
			case "warning": return "🟡";
			case "info": return "🔵";
			case "debug": return "⚪";
			default: return "⚫";
		}
	};

	const levelEmoji = getLevelEmoji(level);
	const isError = level === "error";
	
	// Get Sentry issue URL - prefer issue_url, fallback to web_url
	const sentryUrl = event.issue_url || event.web_url;
	
	// Format timestamp
	const timestamp = event.datetime ? new Date(event.datetime).toLocaleString() : 
		event.timestamp ? new Date(event.timestamp * 1000).toLocaleString() : 
		"Unknown";
	
	// Get release info
	const release = event.release || "Unknown";
	
	// Better user identification
	const userInfo = email || event.user?.id || event.user?.ip_address || "Anonymous";

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
					text: `*Level:*\n${levelEmoji} ${safeString(level?.toUpperCase() || "UNKNOWN")}`
				},
				{
					type: "mrkdwn", 
					text: `*Environment:*\n${safeString(environment)}`
				},
				{
					type: "mrkdwn",
					text: `*Project:*\n${safeString(project)}`
				},
				{
					type: "mrkdwn",
					text: `*Release:*\n${safeString(release)}`
				},
			],
		},
		
		// User and timestamp info
		{
			type: "section",
			fields: [
				{
					type: "mrkdwn",
					text: `*User:*\n${safeString(userInfo)}`
				},
				{
					type: "mrkdwn",
					text: `*Time:*\n${timestamp}`
				},
			],
		},
		
		// Message content (if available)
		...(formatted && formatted !== "-" ? [{
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Message:*\n\`\`\`${safeString(formatted)}\`\`\``
			},
		}] : []),
		
		// Culprit (if available)
		...(culprit ? [{
			type: "section",
			text: {
				type: "mrkdwn",
				text: `*Location:*\n\`${safeString(culprit)}\``
			},
		}] : []),
		
		// Sentry link button
		...(sentryUrl ? [{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "View in Sentry",
						emoji: true
					},
					url: sentryUrl,
					style: isError ? "danger" : "primary"
				}
			]
		}] : []),
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
