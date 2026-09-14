"use client"

import React, {
    useContext,
    useEffect,
    useMemo,
    useState
} from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@base-ui/react/button"
import { Input } from "@/components/ui/input"

import axios from "axios"
import { UserDetailContext } from "@/context/UserDetailContext"


type Repo = {
    id: number
    name: string
    fullName: string
    private_: boolean
    htmlUrl: string
    description: string
    updatedAt: string
   
    defaultBranch: string
    owner: string
}


function RepoDialog({
    setRefreshPage
}: {
    setRefreshPage: (refresh: boolean) => void
}) {

    const [repoList, setRepoList] = useState<Repo[]>([])
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const { userDetail } = useContext(UserDetailContext)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        GetRepoList()
    }, [])


    const GetRepoList = async () => {

        try {

            const result = await axios.get("/api/github/repos")

            console.log("GitHub Repositories:", result.data)

            setRepoList(result.data)

        } catch (error) {

            console.error("Error fetching repositories:", error)

        }
    }


    const filteredRepoList = useMemo(() => {

        const q = searchTerm.trim().toLowerCase()

        if (!q) {
            return repoList
        }

        return repoList.filter((repo) =>
            repo.fullName.toLowerCase().includes(q)
        )

    }, [searchTerm, repoList])
const SaveRepoToDB = async () => {

    if (!selectedRepo) {
        return;
    }

    if (!userDetail?.id) {
        console.error("User ID is missing:", userDetail);

        alert("User information is not available. Please refresh the page and try again.");

        return;
    }

    try {

        const result = await axios.post("/api/user-repo", {

            repoId: selectedRepo.id,
            name: selectedRepo.name,
            fullName: selectedRepo.fullName,
            private_: selectedRepo.private_,
            htmlUrl: selectedRepo.htmlUrl,
            description: selectedRepo.description,
            userId: userDetail?.id,
            owner: selectedRepo.owner,
            updatedAt: selectedRepo.updatedAt,
            
            defaultBranch: selectedRepo.defaultBranch,

        });

        console.log("Repository saved:", result.data);

        setOpen(false);

        setRefreshPage(true);

    } catch (error) {

        console.error("Error saving repository:", error);

    }
};



    return (

        <Dialog
            open={open}
            onOpenChange={(open) => setOpen(open)}
        >

            {/* IMPORTANT: asChild prevents nested button problem */}

            <DialogTrigger>
                
                    + Add Repo
                
            </DialogTrigger>


            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Add Repository
                    </DialogTitle>

                    <DialogDescription>
                        Search and select one of your Github repositories
                    </DialogDescription>

                </DialogHeader>


                <div>

                    <Input
                        placeholder="Search repo"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>


                <ul className="max-h-60 overflow-y-auto border rounded-xl mt-4">

                    {filteredRepoList.map((repo) => (

                        <li
                            key={repo.id}
                            className={`p-4 border-b hover:bg-gray-200 cursor-pointer ${selectedRepo?.id === repo.id
                                    ? "bg-green-600 text-white"
                                    : ""
                                }`}
                            onClick={() => setSelectedRepo(repo)}
                        >
                            {repo.fullName}
                        </li>

                    ))}

                </ul>


                <DialogFooter className="flex gap-5">

                    <DialogClose>
                        Cancel
                    </DialogClose>

                    <Button
                        onClick={SaveRepoToDB}
                        disabled={!selectedRepo}
                    >
                        Add
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    )
}


export default RepoDialog