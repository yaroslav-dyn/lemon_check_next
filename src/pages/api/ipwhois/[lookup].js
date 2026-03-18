const IPWHOIS_BASE_URL = "https://ipwhois.app/json/";

export const runtime = "edge";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    // Not expected for simple GET requests, but harmless if sent.
    res.status(200).end();
    return;
  }

  try {
    const lookupParam = req.query.lookup;
    const lookup =
      Array.isArray(lookupParam) ? lookupParam[0] : lookupParam;

    if (!lookup) {
      res.status(400).json({ error: "Missing lookup" });
      return;
    }

    const targetUrl = `${IPWHOIS_BASE_URL}${lookup}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: "ipwhois proxy failed",
      message: error?.message || "Unknown error",
    });
  }
}

