import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react';
import { useSession } from '@clerk/clerk-react';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import JobCard from '@/components/ui/jobcard'
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const JobListing = () => {
    const override = {
        display: "block",
        margin: "auto",
    };
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");


    const { session, isLoaded } = useSession()


    const {
        fn: fnJobs,
        data: dataJobs,
        loading: loadingJobs
    } = useFetch(getJobs, {
        location,
        company_id,
        searchQuery,
    });

    const {
        fn: fnCompanies,
        data: companies,
    } = useFetch(getCompanies);

    useEffect(() => {
        if (isLoaded) fnCompanies();
    }, [isLoaded])

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, session, location, company_id, searchQuery]);

    useEffect(() => {
        if (dataJobs) {
            console.log("!!! Final Job Data:", dataJobs);
        }
    }, [dataJobs]);

    const handleSearch = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        const query = formData.get("search-query")

        if (query) setSearchQuery(query)
    };

    if (!isLoaded) {
        return <ClipLoader width={"5rem"} radius={"5rem"} cssOverride={override} color={"#F471B6"} />
    }

    return (
        <div>
            <div className='text-7xl font-dark text-white mb-3 sm:text-5xl lg:text-7xl text-center'>
                Latest Jobs
            </div>

            <form onSubmit={handleSearch} className='flex mt-10 ml-5 justify-center gap-4 items-center'>
                    <Input
                        type='text'
                        placeholder='Search for job'
                        name='search-query'
                        className={'placeholder:text-slate-400/70 focus:outline-none outline-none border-none bg-white/95 rounded-4xl lg:h-11 sm:w-3/7 lg:w-2/7 lg:placeholder:text-base lg:text-base sm:placeholder:text-sm sm:text-sm sm:h-8 ::selection:text-black ::selection:text-black '}
                    />

                    <Button type='submit' className={'h-full sm:w-24 lg:w-30 lg:h-10 cursor-pointer'} variant='default'>
                        Search
                    </Button>
            </form>

            <div>
                
            </div>


            {loadingJobs && (
                <ClipLoader radius={"40px"} mt-5 cssOverride={override} color={"#F471B6"} />
            )}

            {loadingJobs === false && (
                <div className='mt-8 grid md: grid-cols-2 lg:grid-cols-3 gap-4 p-6'>
                    {dataJobs?.length ? (
                        dataJobs.map((job) => {
                            return <JobCard key={job.id} job={job}

                                savedInit={job?.saved?.length > 0} />
                        })
                    ) : (
                        <div> No Jobs Found ☹️ </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default JobListing;