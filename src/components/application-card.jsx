import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BoxesIcon, BriefcaseBusinessIcon, DownloadIcon, School2Icon } from 'lucide-react'
import { Student } from '@phosphor-icons/react/dist/ssr'
import { Briefcase, FileArrowDown, UserGear } from '@phosphor-icons/react'
import useFetch from '@/hooks/use-fetch'
import { updateApplications } from '@/api/apiApplications'
import { ClipLoader } from 'react-spinners'
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ApplicationCard = ({ application, isCandidate = false }) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target - "_blank";
        link.click();
    }

    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
        updateApplications,
        {
            job_id: application.job_id,
        }
    )

    const override = {
        display: "block",
        margin: "auto",
    }

    const handleStatusChange = (status) => {
        fnHiringStatus(status)
    }

    return <Card className={"my-3"}>
        <CardHeader>
            {loadingHiringStatus && <ClipLoader width={"5rem"} radius={"5rem"} cssOverride={override} color={"orange"} />}
            <CardTitle className={"flex justify-between items-center"}>
                {
                    isCandidate
                        ? `${application?.job?.title} at ${application?.job?.company?.name}` : application?.name
                }

                <FileArrowDown size={18}
                    className='text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                    onClick={handleDownload} />
            </CardTitle>
        </CardHeader>

        <CardContent className={"flex flex-col gap-0.5 flex-1"}>
            <div className={"flex flex-col justify-between sm:flex-row"}>
                <div className='flex gap-2 items-center'>
                    <Briefcase size={20} />{application?.experience} years of experience</div>

                <div className='flex gap-2 items-center'>
                    <Student size={20} />{application?.education} </div>

                <div className='flex gap-2 items-center'>
                    <UserGear size={20} />{application?.skills} </div>
            </div>
        </CardContent>

        <CardFooter className={"flex justify-between"}>
            <span>{new Date(application?.created_at).toLocaleString()}</span>
            {isCandidate ?
                <span className='capitalized font-medium'>Status: {application?.status}</span> :
                
                (<Select className='lg:h-20 border-none focus:ring-0 focus-visible:ring-ring/0' onValueChange={handleStatusChange} defaultValue={application.status}>
                    <SelectTrigger className={"rounded-4xl text-sm text-gray-500 font-medium"}>
                        <SelectValue placeholder={"Application Status"}
                        />
                    </SelectTrigger>
                    <SelectContent className={'rounded-4xl'}>
                        <SelectItem value={"open"}>Open</SelectItem>
                        <SelectItem value={"closed"}>Closed</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>)
            }
        </CardFooter>
    </Card>
}

export default ApplicationCard