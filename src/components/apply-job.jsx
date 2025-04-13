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


const ApplyJob = ({ user, job, applied = false, fetchJob }) => {
    return (
        <>
            <div className="w-full flex justify-center border border-red-500">
                <Button variant="default" size="lg" className="mt-5">
                    Center Me
                </Button>
            </div>


            <Drawer open={applied ? false : undefined}>
                <DrawerTrigger >

                    {/* TODO: center and size it */}
                    <div className='flex justify-center'>
                        <Button
                            variant={"default"} className={"cursor-pointer mt-5 block mx-auto"}
                            size="lg"
                            disabled={!job?.isOpen || applied}
                        >
                            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring closed!"}
                        </Button>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
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