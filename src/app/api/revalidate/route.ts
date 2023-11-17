/* eslint-disable no-console */
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const pathParam = request.nextUrl.searchParams.get("paths")
  const paths = pathParam ? pathParam.split(",") : [];

  const tagParam = request.nextUrl.searchParams.get("tags")
  const tags = pathParam ? pathParam.split(",") : [];

  // console.log("paths", paths);
  paths.map((path) => revalidatePath(path));

  // console.log("tags", tags);
  tags.map((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
