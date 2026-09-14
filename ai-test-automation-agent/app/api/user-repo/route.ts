import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { repositories } from "@/db";

export async function POST(req: NextRequest) {
    const { repoId, userId, name, fullName, private_, htmlUrl, description,language, updatedAt, owner } = await req.json()

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
    return NextResponse.json( result[0]);
}