import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { CardHeader, Card, CardTitle, CardContent, CardFooter } from './card'
import { BookmarkIcon, MapPinCheckIcon, MapPinIcon, MapPinX, MapPinXIcon, MapPlusIcon, TrashIcon } from 'lucide-react'
import { Button } from './button'
import { Link } from 'react-router-dom'

const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => { },
}) => {

  const { user } = useUser()
  return (
    <Card className={"p-1"}>
      <div className='bg-pink-200/30 rounded-xl m-1 pt-4 pb-4 flex grow flex-col min-w-0'>
        <CardHeader>
          <div className='flex flex-row-reverse justify-between justify-items-end mb-4'>
            <BookmarkIcon className='bg-white rounded-3xl p-2' size={37} strokeWidth={2.1} stroke="black" />
            <div>{job.company.name}</div>
          </div>
          <CardTitle className={"flex justify-between items-baseline font-medium text-3xl"}>{job.title}
            {isMyJob && (<TrashIcon fill="pink" size={18} className='text-pink-300 cursor-pointer' />
            )}
            {job.company && <img src={job.company.logo_url} className='h-6' />}
          </CardTitle >

        </CardHeader>

        <CardContent className={"flex gap-4 mt-5 lg:mt-8 flex-col"}>
          <p className='line-clamp-5'>
          {job.description.substring(0, job.description.indexOf("."))}.
          </p>
        </CardContent>
      </div>

      <CardFooter className={"flex gap-2 justify-between pb-3"}>
        <div className='mt-1 flex items-center gap-2'>
          <MapPinIcon size={16} />
          <p className='m-0 p-0'> {job.location} </p>
        </div>
        <Link to={`/job/${job.id}`}>
          <Button variant={"secondary"} className={"w-full cursor-pointer"}>
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default JobCard