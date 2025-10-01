import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { insertResourcesSchema, resources } from "@/db/schema";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const resourceList = await db
      .select()
      .from(resources)
      .where(eq(resources.id, params.id));

    if (resourceList.length === 0) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(resourceList[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 },
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await req.json();
    const updatedResource = insertResourcesSchema.partial().parse(body);

    const [result] = await db
      .update(resources)
      .set(updatedResource)
      .where(eq(resources.id, params.id))
      .returning();

    revalidatePath(`/resources`);
    revalidatePath(`/resources/${params.id}`);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await db.delete(resources).where(eq(resources.id, params.id)).returning();
    revalidatePath("/resources");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 },
    );
  }
};
