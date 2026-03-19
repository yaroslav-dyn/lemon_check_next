const IPWHOIS_BASE_URL = "https://ipwhois.app/json/";

export const runtime = "edge";

export default async function handler(req) {
  try {
    const pathname = new URL(req.url).pathname;
    const lookup = decodeURIComponent(pathname.split("/").pop() || "");

    if (!lookup) {
      return Response.json(
        { error: "Missing lookup" },
        {
          status: 400,
          headers: { "cache-control": "no-store" },
        }
      );
    }

    const targetUrl = `${IPWHOIS_BASE_URL}${lookup}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const responseBody = await response.text();
    return new Response(responseBody, {
      status: response.status,
      headers: {
        "content-type":
          response.headers.get("content-type") || "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: "ipwhois proxy failed",
        message: error?.message || "Unknown error",
      },
      {
        status: 500,
        headers: { "cache-control": "no-store" },
      }
    );
  }
}

