const STAGING_HOSTS = new Set(["staging.helllo.ai", "dash-staging.helllo.ai"]);

export function isStagingHost(hostname?: string): boolean {
  const host =
    hostname ?? (typeof window !== "undefined" ? window.location.hostname : "");

  return STAGING_HOSTS.has(host) || host.includes("staging");
}

export function getDashboardOrigin(hostname?: string): string {
  return isStagingHost(hostname)
    ? "https://dash-staging.helllo.ai"
    : "https://dash.helllo.ai";
}

export function getDashboardUrl(path: string, hostname?: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getDashboardOrigin(hostname)}${normalizedPath}`;
}

export function getDashboardAuthSignInUrl(
  redirectPath = "/console",
  hostname?: string
): string {
  return getDashboardUrl(
    `/auth/signin?redirect=${encodeURIComponent(redirectPath)}`,
    hostname
  );
}
