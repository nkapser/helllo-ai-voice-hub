declare global {
  interface Window {
    Cookiebot?: {
      renew: () => void;
    };
  }
}

export function openCookiePreferences(): void {
  window.Cookiebot?.renew();
}
