import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react';
import { useSession } from '@clerk/clerk-react';

const JobListing = () => {

    const {session, isLoaded} = useSession()


    const { fn: fnJobs, data: dataJobs, loading: loadingJobs } = useFetch(getJobs);

    console.log("Data1: ", dataJobs);

    useEffect(() => {
        const fetchTokenAndJobs = async () => {
            if (!isLoaded || !session) return; // wait until session exists
    
            const token = await session.getToken({ template: 'bettafish_supabase' });
    
            if (token) {
                fnJobs(token);
            }
        };
    
        fetchTokenAndJobs(); // run when session becomes available
    }, [isLoaded, session]); // <---
    //  important!    

    useEffect(() => {
        if (dataJobs) {
            console.log("📦 Final Job Data:", dataJobs);
        }
    }, [dataJobs]);

    return (
        <div>JobListing</div>
    )
}

export default JobListing;