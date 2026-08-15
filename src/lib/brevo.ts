const BREVO_API_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_SECONDS = 10;

let lastSubscribeAt = 0;

export type BrevoSubscribeResult =
  | { status: "ok" }
  | { status: "already" }
  | { status: "invalid_email" }
  | { status: "rate_limited"; remainingSeconds: number }
  | { status: "not_configured" }
  | { status: "error"; message: string };

export async function subscribeToBrevo(
  email: string,
  attributes?: Record<string, string | boolean>,
): Promise<BrevoSubscribeResult> {
  const trimmed = email.trim();
  if (!EMAIL_REGEX.test(trimmed)) {
    return { status: "invalid_email" };
  }

  const now = Date.now();
  if (lastSubscribeAt) {
    const elapsed = (now - lastSubscribeAt) / 1000;
    if (elapsed < RATE_LIMIT_SECONDS) {
      return {
        status: "rate_limited",
        remainingSeconds: Math.ceil(RATE_LIMIT_SECONDS - elapsed),
      };
    }
  }

  const apiKey = import.meta.env.VITE_BREVO_API_KEY || "";
  const listId = import.meta.env.VITE_BREVO_LIST_ID || "";
  if (!apiKey || !listId) {
    return { status: "not_configured" };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: trimmed,
        listIds: [parseInt(listId, 10)],
        updateEnabled: true,
        ...(attributes ? { attributes } : {}),
      }),
    });

    if (response.ok || response.status === 204) {
      lastSubscribeAt = Date.now();
      return { status: "ok" };
    }

    if (response.status === 400) {
      const error = await response.json().catch(() => ({}));
      if (
        typeof error.message === "string" &&
        (error.message.includes("already exists") || error.code === "duplicate_parameter")
      ) {
        return { status: "already" };
      }
      return { status: "error", message: error.message || "Failed to subscribe" };
    }

    return { status: "error", message: "Failed to subscribe" };
  } catch (error) {
    console.error("Brevo subscription error:", error);
    return { status: "error", message: "Failed to subscribe" };
  }
}
