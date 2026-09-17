"use client"

import { UserDetailContext } from '@/context/UserDetailContext'
import { Button } from '@base-ui/react/button'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import EmptyWorkspace from './EmptyWorkspace'
import axios from 'axios'
import RepoDialog, { Repo } from './RepoDialog'
import UserRepoList from './UserRepoList'

export type UserRepo = {
    id: string;
    userId: string;
    repoId: string;
    name: string;
    fullName:string;
    private_: boolean;
    htmlUrl:string;
    description:string;
    owner:string;
    createdAt:Date;
    updatedAt:Date;
    defaultBranch:string;
    
}

function WorkspaceBody() {

    const { userDetail } = useContext(UserDetailContext)
    const [token, setToken] = useState('')
    const [userRepoList, setUserRepoList] = useState<UserRepo[]>([]);

    const GetGithubUserToken = async () => {
        try {
            const result = await axios.get('/api/github/token')

            console.log("GitHub Token:", result.data.token)

            setToken(result.data.token || '')
        } catch (error) {
            console.error("Error getting GitHub token:", error)
            setToken('')
        }
    }

    useEffect(() => {
        GetGithubUserToken()

    }, [])

    useEffect(() => {
        userDetail && GetUserAddedRepoList()
    }, [userDetail])

    const OnAddRepo = () => {
        window.location.href = '/api/github'
    }
    const GetUserAddedRepoList = async () => {
        const result = await axios.get('/api/user-repo?userId=' + userDetail?.id);
        console.log(result.data);
        setUserRepoList(result.data);
    }

    return (
        <div>

            <div className='flex justify-between items-center'>

                <h2 className='text-4xl font-medium'>
                    Workspace
                </h2>

                <h2 className='text-green-800 bg-blue-100 px-2 rounded-lg'>
                    Remaining Credits: {userDetail?.credits}
                </h2>

            </div>


            <Card className='mt-5 !flex !flex-row justify-between items-center p-4 border rounded-lg w-full max-w-[735px]'>

                <div className='flex items-center gap-5'>

                    <Image
                        src='/githubb.png'
                        alt='github'
                        width={40}
                        height={40}
                    />

                    <h2 className='text-lg'>
                        Connect Github & Add Repository
                    </h2>

                </div>


                <div>

                    {!token ? (

                        <Button
                            onClick={OnAddRepo}
                            className='bg-[#6b9f45] text-white px-4 py-2 rounded-md'
                        >
                            Setup
                        </Button>

                    ) : (

                        <RepoDialog
                            setRefreshPage={(refresh: boolean) => GetUserAddedRepoList()
                            }
                        />

                    )}

                </div>

            </Card>


            {userRepoList?.length === 0 ? (
                <Card className='mt-10'>
                    <CardContent>
                        <EmptyWorkspace />
                    </CardContent>
                </Card>
            ) : (
                <UserRepoList repoList={userRepoList} />
            )}

        </div>
    )
}

export default WorkspaceBody