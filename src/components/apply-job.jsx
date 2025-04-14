import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Input } from './ui/input'
import FormJob from './ui/form'

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
    return (
        <>


            <Drawer open={applied ? false : undefined} >
                <div className="w-full flex justify-center">
                    <DrawerTrigger >
                        <Button
                            variant={"default"} className={"h-11 lg:mt-12 cursor-pointer mt-8 w-sm sm:w-xl md:w-2xl"}
                            size="lg"
                            disabled={!job?.isOpen || applied}
                        >
                            {job?.isOpen ? (applied ? "Already applied for this job" : "Apply for this job") : "Hirings are closed for this job!"}
                        </Button>
                    </DrawerTrigger>
                </div>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className={"block m-auto font-normal"}>Apply for <span className='font-medium'>{job?.title}</span> at <span className='lg:text-lg text-teal-600/95 font-semibold tracking-wide'>{job?.company?.name}</span></DrawerTitle>
                        <DrawerDescription className={"block m-auto"}>Please fill this form.</DrawerDescription>
                    </DrawerHeader>

                    <FormJob></FormJob>


                    <DrawerFooter>
                            <DrawerClose>
                            <div className='flex justify-center gap-3 lg:gap-7'>
                                <Button variant={"outline"} className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 w-1/4 hover:text-gray-200">Submit</Button>

                                <Button variant="outline" className={"text-white bg-teal-100 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-1/4 px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 hover:text-gray-200"}  >Cancel</Button>
                        </div>
                            </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default ApplyJob