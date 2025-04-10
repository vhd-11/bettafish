import { getSingleJob, updateHiringstatus } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import MDEditor from '@uiw/react-md-editor'
import { BriefcaseBusinessIcon, Clock10Icon, DoorClosedIcon, DoorOpenIcon, MapPinIcon, PersonStandingIcon, MapPlusIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

    const {
        loading: loadingHiringStatus,
        fn: fnHiringStatus,
    } = useFetch(updateHiringstatus, {
        job_id: id,
    })

    const handleStatusChange = (value) => {
        const isOpen = value == "open"
        fnHiringStatus(isOpen).then(() => fnJob())
    }

    const override = {
        display: "block",
        margin: "auto",
    };

    const override2 = {
        display: "block",
        // margin: "auto",
        margin: "0 4 0 0"
    }

    useEffect(() => {
        if (isLoaded) fnJob();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    if (!isLoaded || loadingJob) {
        return <ClipLoader radius={"23px"} mt-30 cssOverride={override} color={"#F471B6"} />
    }

    return (
        <div>

            {/* big container getting all of this HEADER CONTAINER */}
            <div className='m-10'>

                {/* logo */}
                <div className='flex justify-start sm:gap-2.5 lg:gap-3 items-start gap-2'>
                    <img src={job?.company?.logo_url} className='bg-slate-100/70 rounded-xl p-2 h-15 lg:h-18' alt={job?.title} />

                    {/* job title n company name */}
                    <div className='flex flex-col'>
                        <div className='flex flex-col'>
                            <h1 className='lg:text-5xl text-3xl font-medium'>{job?.title}</h1>

                            <p className='lg:text-lg text-pink-400 font-bold tracking-wider'>{job?.company?.name}</p>
                        </div>

                        {/* 3 tabs for fulltime remote n location */}
                        <div className='flex text-sm mt-3 text-gray-500 font-medium flex-col gap-2 lg:gap-4'>
                            <div className='flex gap-2'>
                                <div className='flex gap-0.2 items-baseline bg-slate-100/70 p-2 rounded-xl'>
                                    <MapPinIcon height={'14'}></MapPinIcon>
                                    <div>{job?.location}</div>
                                </div>
                                <div className='flex gap-0.2 items-center bg-slate-100/70 p-2 rounded-xl'>
                                    <BriefcaseBusinessIcon height={'14'} ></BriefcaseBusinessIcon>
                                    <div>{job?.mode}</div>
                                </div>
                                <div className='flex gap-0.2 items-center bg-slate-100/70 p-2 rounded-xl'>
                                    <Clock10Icon height={'14'}></Clock10Icon>
                                    <div>{job?.whattime}</div>
                                </div>
                            </div>

                            <div className='flex justify-start'>
                                <div className='flex gap-0.2 items-baseline p-2 rounded-xl'>
                                    <PersonStandingIcon height={'14'}></PersonStandingIcon>
                                    <div>{`${job?.applications?.length} applicants`}</div>
                                </div>

                                {/* close/open application */}

                                {job?.recruiter_id === user?.id ? ( <Select className='lg:h-20 border-none focus:ring-0 focus-visible:ring-ring/0' onValueChange={handleStatusChange}>
                                    <SelectTrigger className={ `rounded-4xl text-sm text-gray-500 font-medium  ${job?.isOpen ? "text-green-700" : "text-red-700"}`}>
                                        <SelectValue placeholder = {job?.isOpen ? (
                                            <>
                                                <DoorOpenIcon color='#008236' height={'16'} /> <p className='text-green-700'>Open</p>
                                            </>
                                        ) : (
                                            <>
                                                <DoorClosedIcon color='#C10007' />  <p className='text-red-700'>Closed</p>
                                            </>
                                        )}
                                            
                                            />
                                    </SelectTrigger>
                                    <SelectContent className={'rounded-4xl'}>
                                        <SelectItem value={"open"}>Open</SelectItem>
                                        <SelectItem value={"closed"}>Closed</SelectItem>                      
                                    </SelectContent>
                                </Select> ) : (
                                <div className='flex flex-row gap-6'>
                                    <div className='flex gap-0.2 items-center p-2 rounded-xl'>
                                        {job?.isOpen ? (
                                            <>
                                                <DoorOpenIcon color='#008236' height={'16'} /> <p className='text-green-700'>Open</p>
                                            </>
                                        ) : (
                                            <>
                                                <DoorClosedIcon color='#C10007' height={'16'} />  <p className='text-red-700'>Closed</p>
                                            </>
                                        )}
                                    </div>
                                </div> )}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <hr className='ml-10 mr-10'></hr>

            {/* job deets */}
            <div className='lg:m-10 ml-10 mt-5' >
                <p className='lg:text-3xl text-xl font-medium'>Job Details</p>
                <p className='mt-2 lg:mt-5 text-gray-500 font-normal'>{job?.description}</p>

                <p className='lg:text-3xl text-xl font-medium lg:mt-12 mt-8 mb-2 lg:mb-5'>Requirements</p>
                <MDEditor.Markdown
                    source={job?.requirements} className='mt-2 lg:mt-5 text-gray-500 font-normal' />

                {/* TODO: render applications */}
            </div>

        </div>
    )
}

export default JobPage