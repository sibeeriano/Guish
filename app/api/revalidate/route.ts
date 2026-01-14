import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

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
    // Revalidar el caché de Prismic por tag (usado en prismicio.ts)
    revalidateTag("prismic");
    
    // También revalidar la ruta principal
    revalidatePath("/", "page");

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
