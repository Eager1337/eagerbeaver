// Guarded service worker registration. No-op in dev / Lovable preview / iframe.
export function registerPortfolioOsSw() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  const host = window.location.hostname;
  const inIframe = window.self !== window.top;
  const isPreview =
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host.endsWith(".lovableproject.com") ||
    host.endsWith(".lovableproject-dev.com") ||
    host.endsWith(".beta.lovable.dev") ||
    host === "beta.lovable.dev";
  const off = new URLSearchParams(window.location.search).get("sw") === "off";

  const isDev = !!(import.meta as unknown as { env?: { PROD?: boolean } }).env && !(import.meta as unknown as { env: { PROD: boolean } }).env.PROD;

  if (isDev || inIframe || isPreview || off) {
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      regs.forEach((r) => {
        if (r.active?.scriptURL.endsWith("/sw.js")) r.unregister();
      });
    });
    return;
  }
  navigator.serviceWorker.register("/sw.js").catch(() => undefined);
}