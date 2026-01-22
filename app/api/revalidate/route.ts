import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/", "page");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error revalidating cache",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
