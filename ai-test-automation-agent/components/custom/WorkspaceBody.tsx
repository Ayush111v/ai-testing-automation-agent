"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import { Button } from '@base-ui/react/button';
import Image from 'next/image'
import React, { useContext } from 'react'
import { Card, CardContent } from '../ui/card';
import EmptyWorkspace from './EmptyWorkspace';

function WorkspaceBody() {
    const { userDetail } = useContext(UserDetailContext);
    return (
        <div>

            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-meduim'>Workspace</h2>
                <h2 className='text-green-800 bg-blue-100 px-2 rounded-lg'>Remaining Credits: {userDetail?.credits}</h2>
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

    <Button className='bg-[#6b9f45] text-white px-4 py-2 rounded-md'>
        Install
    </Button>
</Card>
            <Card className='mt-10'>
                <CardContent>
                    <EmptyWorkspace />
                </CardContent>
            </Card>
        </div>

    )
}

export default WorkspaceBody