// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const runtime = "edge";

export default function handler() {
  return Response.json({ name: "John Doe" });
}
