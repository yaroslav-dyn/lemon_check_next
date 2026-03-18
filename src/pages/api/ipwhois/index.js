const IPWHOIS_BASE_URL = "https://ipwhois.app/json/";

export default async function handler(req, res) {
  // Prevent any potential caching of IP lookup results.
  res.setHeader("Cache-Control", "no-store");

  try {
    const response = await fetch(IPWHOIS_BASE_URL, {
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

