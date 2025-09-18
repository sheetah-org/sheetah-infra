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
	const isError = level === "error";

	const blocks = [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: `${isError ? ":red_circle:" : ""} *${title}*`,
			},
		},
		{
			type: "section",
			fields: [
				{ type: "mrkdwn", text: `*Environment:*\n${safeString(environment)}` },
				{ type: "mrkdwn", text: `*Level:*\n${safeString(level)}` },
				{ type: "mrkdwn", text: `*Project:*\n${safeString(project)}` },
			],
		},
		{
			type: "section",
			fields: [
				{ type: "mrkdwn", text: `*User:*\n${safeString(email)}` },
			],
		},
		{ type: "divider" },
		{
			type: "section",
			text: { type: "mrkdwn", text: `*Message:*\n${safeString(formatted)}` },
		},
		{
			type: "section",
			text: { type: "mrkdwn", text: `*Culprit:*\n${safeString(culprit)}` },
		},
		{ type: "divider" },
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
