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


            <Drawer open={applied ? false : undefined}>
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
                        <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                        <DrawerDescription>Please fill this form.</DrawerDescription>
                    </DrawerHeader>

                    <FormJob className=""></FormJob>

                    <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default ApplyJob