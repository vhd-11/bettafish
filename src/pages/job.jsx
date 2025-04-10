import { getSingleJob } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

    if (isLoaded || loadingJob) {
        return <ClipLoader radius={"23px"} mt-300 cssOverride={override} color={"#F471B6"} />
    }

    return (
        <div>JobPage</div>
    )
}

export default JobPage