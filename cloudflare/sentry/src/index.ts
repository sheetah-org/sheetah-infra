/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { verifySignature } from "./utils";
import type { SentryIssueAlertWebhook } from "./types";
import { postSentryAlertToSlack } from "./slack";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.url !== "/" && request.method !== "POST") {
			return new Response("Method not allowed", { status: 405 });
		}

		// Validate Sentry Issue Alert webhook per docs
		// https://docs.sentry.io/organization/integrations/integration-platform/webhooks/issue-alerts/
		const hookResource = request.headers.get("Sentry-Hook-Resource");
		if (hookResource !== "event_alert") {
			return new Response("Unsupported Sentry-Hook-Resource", {
				status: 400,
			});
		}

		let payload: SentryIssueAlertWebhook;
		try {
			payload = (await request.json()) as SentryIssueAlertWebhook;
		} catch {
			return new Response("Invalid JSON", { status: 400 });
		}

		// Minimal shape check
		const action = payload?.action;
		const data = payload?.data;
		if (action !== "triggered" || typeof data !== "object") {
			return new Response("Invalid payload", { status: 400 });
		}

		// Verify Sentry webhook signature
		const secret = env?.SENTRY_WEBHOOK_SECRET as string | undefined;
		if (secret) {
			const requestForVerification = new Request(request.url, {
				method: request.method,
				headers: request.headers,
				body: JSON.stringify(payload),
			});

			if (!verifySignature(requestForVerification, secret)) {
				return new Response("Invalid signature", { status: 401 });
			}
		}

		// Forward to Slack if configured
		await postSentryAlertToSlack({
			env,
			webhook: payload,
			channel: env.SLACK_DEFAULT_CHANNEL,
		});

		return new Response("ok");
	},
} satisfies ExportedHandler<Env>;
