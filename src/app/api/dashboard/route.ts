import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { iot } from "../../../../migrations/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      console.log("No ID provided");
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const res = await db
      .select({
        id: iot.id,
        type: iot.type,
        brand: iot.brand,
        model: iot.model,
        createdAt: iot.createdAt,
        detail: iot.detail,
        owner: iot.owner,
        ownerEmail: iot.ownerEmail,
      })
      .from(iot)
      .where(eq(iot.owner, userId));
    return NextResponse.json({
      success: true,
      iot: res,
    });
  } catch (error) {
    console.error("Error fetching workspace data:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
