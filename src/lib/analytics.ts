export const GA_ID = "G-00FCDGDS6Z";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string
) {
  window.gtag?.("event", action, {
    event_category: category,
    event_label: label,
  });
}
