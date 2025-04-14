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


            <Drawer open={applied ? false : undefined}>
            <div className="w-full flex justify-center">
                <DrawerTrigger >


                        <Button
                            variant={"default"} className={"h-11 lg:h-13 cursor-pointer mt-8 w-sm sm:w-xl md:w-2xl lg:w-4xl xl:w-6xl"}
                            size="lg"
                            disabled={!job?.isOpen || applied}
                        >
                            {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring closed!"}
                        </Button>
                </DrawerTrigger>
                </div>
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