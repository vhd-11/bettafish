import { getSingleJob } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
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
        <div className='white-bg'>
            <div className='m-10'>
                <div className='flex justify-start sm:gap-2.5 lg:gap-5 items-center'>
                    <img src={job?.company?.logo_url} className='h-10 lg:h-15' alt={job?.title} />
                    <div className='flex flex-col'>
                        <h1 className='sm:text-2xl lg:text-4xl'>{job?.title}</h1>
                        <p>{job?.company?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobPage