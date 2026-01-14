import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  // Verificar que la petición viene de Prismic (opcional pero recomendado)
  const secret = request.headers.get("x-prismic-webhook-secret");
  const expectedSecret = process.env.PRISMIC_WEBHOOK_SECRET;

  // Si hay un secret configurado, verificar que coincida
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Revalidar el caché de Prismic
    revalidateTag("prismic");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating cache", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
