import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  console.log(1);

  await update();

  return new NextResponse(JSON.stringify({ message: "subs updated" }), {
    status: 200,
  });
}

async function update() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/sub/reset`);
  const data = await res.json();

  console.log({ data });

  return data;
}
