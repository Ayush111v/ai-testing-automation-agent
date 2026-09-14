import React from 'react'
import Image from 'next/image'
import { UserRepo } from './WorkspaceBody'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, ListChecks, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import { Button } from '@base-ui/react'

type Props = {
    repoList: UserRepo[]
}

function UserRepoList({ repoList }: Props) {

    const totalTests = 0
    const passedTests = 0
    const failedTests = 0
    const passRate = totalTests > 0
        ? Math.round((passedTests / totalTests) * 100)
        : 0
    return (
        <div className='mt-10'>
            <h2 className='my-3 font-medium'>REPOSITORIES</h2>


            {repoList.map((repo, index) => (
                <Accordion key={repo.id || index}>
                    <AccordionItem value="item-1" className='border px-5 py-3 rounded-lg'>
                        <AccordionTrigger>
                            <div className="flex items-center gap-5">
                                <Image src={'/githubb.png'} alt='github' width={34} height={34} />
                                <div className='flex flex-col item-start gap-1'>
                                    <h2>{repo.fullName}</h2>
                                    <p className='text-xs text-gray-500'>
                                        {repo.defaultBranch} | {repo.repoId}

                                    </p>
                                </div>
                            </div>


                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='pt-4 space-y-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>

                                    <StatusCard
                                        title="Total Tests"
                                        value={totalTests}
                                        icon={<ListChecks className='h-5 w-5 text-blue-600' />}
                                        bgColor="bg-blue-50"
                                    />

                                    <StatusCard
                                        title="Passed"
                                        value={passedTests}
                                        icon={<CheckCircle2 className='h-5 w-5 text-green-600' />}
                                        bgColor="bg-green-50"
                                    />

                                    <StatusCard
                                        title="Failed"
                                        value={failedTests}
                                        icon={<XCircle className='h-5 w-5 text-red-600' />}
                                        bgColor="bg-red-50"
                                    />

                                    <StatusCard
                                        title="Pass Rate"
                                        value={`${passRate}%`}
                                        icon={<TrendingUp className='h-5 w-5 text-purple-600' />}
                                        bgColor="bg-purple-50"
                                    />

                                </div>

                                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4 bg-gray-50'>
                                    <div>
                                        <h3 className='font-medium'>Generate AI Test Cases</h3>
                                        <p className='text-sm text-gray-500 mt-1'>
                                            Analyze this repository and generate automated test cases using AI.
                                        </p>
                                    </div>

                                    <Button className='gap-2'>
                                        <Sparkles className='h-6 w-6' />
                                        Click Me To Generate Test Cases
                                    </Button>
                                </div>
                            </div>
                        </AccordionContent>

                    </AccordionItem>
                </Accordion>
            ))}

        </div>
    )
}

export default UserRepoList


function StatusCard({
    title,
    value,
    icon,
    bgColor
}: {
    title: string
    value: string | number
    icon: React.ReactNode
    bgColor: string
}) {
    return (
        <div className='border rounded-xl p-4 flex items-center justify-between bg-white'>
            <div>
                <p className='text-sm text-gray-500'>{title}</p>
                <h3 className='text-2xl font-semibold mt-1'>{value}</h3>
            </div>

            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}>
                {icon}
            </div>
        </div>
    )
}
