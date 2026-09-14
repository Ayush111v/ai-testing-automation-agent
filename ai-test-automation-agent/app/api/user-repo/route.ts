import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { repositories } from "@/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const { repoId, userId, name, fullName, private_, htmlUrl, description, language, updatedAt, owner } = await req.json()

    const result = await db.insert(repositories).values({
        repoId,
        userId,
        name,
        fullName: fullName,
        private: private_ ? 1 : 0,
        htmlUrl: htmlUrl,
        description,


        owner
    }).returning();
    return NextResponse.json(result[0]);
}


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    const result = await db.select().from(repositories).where(
        //@ts-ignore
        eq(repositories.userId, userId)
    )
    return NextResponse.json(result);
}