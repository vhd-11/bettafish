import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { CardHeader, Card, CardTitle, CardContent, CardFooter } from './card'
import { BookmarkIcon, MapPinIcon, TrashIcon } from 'lucide-react'
import { Button } from './button'
import { Link } from 'react-router-dom'
import { saveJob } from '@/api/apiJobs'
// import SaveJob from '@/pages/saved-job'
import useFetch from '@/hooks/use-fetch'

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => { },
}) => {

  const [saved, setSaved] = useState(savedInit)
  const { user } = useUser();

  const {
    fn: fnSaveJobs,
    data: savedJob,
    loading: loadingSavedJob
  } = useFetch(saveJob,{
    alreadySaved: saved,
  })


  const handleSaveJob = async () => {
    await fnSaveJobs({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  // const handleDeleteJob = async () => {
  //   await fnDeleteJob();
  //   onJobAction();
  // };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob])

  return (
    <Card className={"p-1"}>
      <div className='bg-pink-200/30 rounded-xl m-1 pt-4 pb-4 flex grow flex-col min-w-0 gap-2'>
        <CardHeader>
            <div className='font-light sm:text-sm lg:text-base italic'>{job.company.name}</div>

          <CardTitle className={"flex justify-between items-baseline font-medium sm:text-lg lg:text-3xl"}>{job.title}
            {isMyJob && (<TrashIcon fill="pink" size={18} className='text-pink-300 cursor-pointer' />
            )}
            {job.company && <img src={job.company.logo_url} className='h-6' />}
          </CardTitle >

        </CardHeader>

        <CardContent className={"flex gap-4 sm:mt-5 lg:mt-8 flex-col"}>
          <p className='sm:text-xs md:text-sm lg:text-sm'>
            {job.description.substring(0, job.description.indexOf("."))}.
          </p>
        </CardContent>
      </div>

      <CardFooter className={"flex gap-2 justify-between pb-3"}>
        <div className='mt-1 flex items-baseline gap-1'>
          <MapPinIcon size={14} stroke={"#7D8898"} strokeWidth={2.5} />
          <p className='m-0 p-0 font-medium text-slate-600/70 text-sm'> {job.location} </p>
        </div>

        <div className='flex justify-center'>
        <Link to={`/job/${job.id}`}>
          <Button variant={"default"} className={"w-full lg:text-sm sm:text-xs cursor-pointer"}>
            Details
          </Button>
        </Link>
        {!isMyJob && (
              <Button variant={"transparent"}
                className="w-15"
                onClick={handleSaveJob}
                disabled={loadingSavedJob} >

                {saved ? (

                  <BookmarkIcon size={20} strokeWidth={2.1} stroke="black" fill="black" />) : (
                  <BookmarkIcon className='rounded-3xl' size={37} strokeWidth={2.1} stroke="black"  />
                )}

              </Button>
            )}
              </div>
      </CardFooter>
    </Card>
  )
}

export default JobCard