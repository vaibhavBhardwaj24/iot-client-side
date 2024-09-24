import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { iot } from "../../../../migrations/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { LinkId, Brand, Model, Type, Detail, owner, ownerMail } =
      await req.json();
    if (!LinkId) {
      return NextResponse.json({
        status: 400,
        message: "LinkId is required",
      });
    }

    const device = await db
      .select({
        id: iot.id,
        owner: iot.owner,
      })
      .from(iot)
      .where(eq(iot.id, LinkId));
    if (device.length === 0) {
      return NextResponse.json({
        status: 400,
        message: "Invalid ID",
      });
    }
    if (device[0].owner) {
      return NextResponse.json({
        status: 400,
        message: "Already Linked",
      });
    }
    const res = await db
      .update(iot)
      .set({
        type: Type.currentKey,
        brand: Brand,
        model: Model,
        detail: Detail.currentKey || null,
        owner: owner,
        ownerEmail: ownerMail,
      })
      .where(eq(iot.id, LinkId));

    return NextResponse.json({
      status: 200,
      message: "Linked",
      iot: res,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      status: 500,
      message: "Error",
    });
  }
}
