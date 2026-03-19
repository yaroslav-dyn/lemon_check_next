const IPWHOIS_BASE_URL = "https://ipwhois.app/json/";

export const runtime = "edge";

const getClientIpFromHeaders = (req) => {
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp;

  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return "";
};

export default async function handler(req) {
  try {
    const clientIp = getClientIpFromHeaders(req);
    const targetUrl = clientIp
      ? `${IPWHOIS_BASE_URL}${encodeURIComponent(clientIp)}`
      : IPWHOIS_BASE_URL;

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

