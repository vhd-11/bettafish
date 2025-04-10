import { getSingleJob } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Clock10Icon, MapPinIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'

const JobPage = () => {

    const { isLoaded, user } = useUser()
    const { id } = useParams()

    const {
        loading: loadingJob,
        data: job,
        fn: fnJob,
    } = useFetch(getSingleJob, {
        job_id: id,
    })

    const override = {
        display: "block",
        margin: "auto",
    };

    useEffect(() => {
        if (isLoaded) fnJob();
    }, [isLoaded])

    if (!isLoaded || loadingJob) {
        return <ClipLoader radius={"23px"} mt-30 cssOverride={override} color={"#F471B6"} />
    }

    return (
        <div>
            <div className='m-10'>
                <div className='flex justify-start sm:gap-2.5 lg:gap-3 items-start gap-2'>
                    <img src={job?.company?.logo_url} className='bg-slate-100 rounded-xl p-2 h-14 lg:h-15' alt={job?.title} />
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='sm:text-2xl lg:text-4xl text-xl'>{job?.title}</h1>
                            <p className='lg:text-lg text-pink-400 font-bold tracking-wider'>{job?.company?.name}</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex gap-1'>
                                <MapPinIcon></MapPinIcon>
                                <div>{job?.location}</div>
                            </div>
                            <div className='flex gap-1'>
                                <BriefcaseBusinessIcon></BriefcaseBusinessIcon>
                                <div>{job?.mode}</div>
                            </div>
                            <div className='flex gap-1'>
                                <Clock10Icon></Clock10Icon>
                                <div>{job?.whattime}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobPage