import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const cookiesStore = await cookies();

    const token = cookiesStore.get("gh_token")?.value;

    if (!token) {
        return NextResponse.json(
            { error: "Github token not found" },
            { status: 401 }
        );
    }

    const allRespo: any[] = [];

    let page = 1;

    while (true) {

        const res = await fetch(
            `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                },
            }
        );

        const respos = await res.json();

        // Check GitHub API errors
        if (!res.ok) {
            console.error("GitHub API Error:", respos);

            return NextResponse.json(
                {
                    error: "Failed to fetch GitHub repositories",
                    details: respos,
                },
                { status: res.status }
            );
        }

        if (!respos.length) {
            break;
        }

        allRespo.push(...respos);

        page++;
    }

    return NextResponse.json(
        allRespo.map((r) => ({
            id: r.id,
            name: r.name,

            // IMPORTANT: These names must match RepoDialog
            fullName: r.full_name,
            private_: r.private,
            htmlUrl: r.html_url,
            description: r.description,
            updatedAt: r.updated_at,
            
            defaultBranch: r.default_branch,
            owner: r.owner?.login,
        }))
    );
}