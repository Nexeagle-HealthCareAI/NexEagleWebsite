// Retires the service worker that the old Doctor Dekho PWA installed on THIS origin.
//
// Until the split, nexeagle.com served Doctor Dekho (an installable, offline-capable PWA), so a
// lot of browsers have a Serwist service worker registered here at /sw.js with the scope "/",
// precaching the old app shell and serving cached pages. Now that nexeagle.com is the corporate
// site and Doctor Dekho lives on its own origin, a lingering worker would keep serving stale
// patient-portal pages from cache.
//
// Browsers re-fetch a registered worker's script on navigation (bypassing the HTTP cache) and, if
// the bytes differ, install the new one. This replacement just clears every cache, unregisters
// itself, and reloads open tabs -- after which no worker controls the origin and the business site
// loads straight from the network. Keep serving it for a good while (months): a visitor who hasn't
// returned since the split only picks it up on their next visit.
//
// A route handler rather than public/sw.js because public/sw.js is a gitignored, build-generated
// path (it used to be emitted by Serwist on every build).
export const dynamic = "force-static";

const KILL_SWITCH = `
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      windows.forEach((client) => client.navigate(client.url));
    })()
  );
});
`;

export function GET() {
  return new Response(KILL_SWITCH, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
