const IPWHOIS_BASE_URL = "https://ipwhois.app/json/";

export const runtime = "edge";

export default async function handler() {
  try {
    const response = await fetch(IPWHOIS_BASE_URL, {
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

