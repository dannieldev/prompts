export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // The public edition must never expose or mutate the legacy personal database.
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "Endpoint no disponible en la edición pública." }), {
        status: 404,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    }

    if (!env.ASSETS) return new Response("Not found", { status: 404 });
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "index, follow");
    if (url.pathname === "/" || url.pathname.endsWith(".html") || !url.pathname.includes(".")) {
      headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    } else if (url.pathname.startsWith("/assets/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
