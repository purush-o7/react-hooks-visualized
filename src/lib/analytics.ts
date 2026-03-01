export const GA_ID = "G-2JH1QHSXQC";

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
