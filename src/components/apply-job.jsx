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
import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Controller } from 'react-hook-form';
import { Input } from './ui/input';
import useFetch from '@/hooks/use-fetch';
import { applyToJob } from '@/api/apiApplications';
import { ClipLoader } from 'react-spinners';

const schema = z.object({
    experience: z
        .number()
        .min(0, { message: "Experience cannot be less than 0 years." })
        .int(),

    skills: z
        .string()
        .min(1, { message: "Skills are required" }),

    education: z
        .enum(["Undergraduate", "Graduate", "Post-Graduate"], {
            message: "Education is required",
        }),

    resume: z
        .any()
        .refine(
            (file) =>
                file[0] &&
                (file[0].type === "application/pdf" ||
                    file[0].type === "application/msword"),
            { message: "Only PDF or Word documents are allowed." }
        ),
})

const override = {
    display: "block",
    margin: "auto",
};

const ApplyJob = ({ user, job, applied = false, fetchJob }) => {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
    })

    const {
        loading: loadingApply,
        error: errorApply,
        fn: fnApply,
    } = useFetch(applyToJob)

    const onSubmit = (data) => {
        console.log(data);  // Add this line to see the request payload
        fnApply({
            ...data,
            job_id: job.id,
            candidate_id: user.id,
            name: user.fullName,
            status: "applied",
            resume: data.resume[0]
        }).then(() => {
            fetchJob();
            reset();
        })
    }

    return (
        <>
            <Drawer open={applied ? false : undefined} >
                <div className="w-full flex justify-center">
                    <DrawerTrigger asChild>
                        <Button
                            variant={"default"} className={"h-11 lg:mt-12 cursor-pointer mt-8 w-sm sm:w-xl md:w-2xl"}
                            size="lg"
                            disabled={!job?.isOpen || applied}
                        >
                            {job?.isOpen ? (applied ? "Already applied for this job" : "Apply for this job") : "Hirings are closed for this job!"}
                        </Button>
                    </DrawerTrigger>
                </div>
                <DrawerContent className={"max-h-svh"}>
                    <DrawerHeader>
                        <DrawerTitle className={"block m-auto font-normal"}>Apply for <span className='font-medium'>{job?.title}</span> at <span className='lg:text-lg text-teal-600/95 font-semibold tracking-wide'>{job?.company?.name}</span></DrawerTitle>
                        <DrawerDescription className={"block m-auto"}>Please fill this form.</DrawerDescription>
                    </DrawerHeader>

                    {/* form */}
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="number" name="floating_years" id="floating_years" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-600 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required
                                    {...register("experience", {
                                        valueAsNumber: true,
                                    })} />
                                <label htmlFor="floating_years" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Years of Experience</label>
                                {errors.experience && (
                                    <p className='text-red-500'>{errors.experience.message}</p>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_years" id="floating_years" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-600 focus:outline-none focus:ring-0 focus:border-teal-600 peer" placeholder=" " required
                                    {...register("skills")} />
                                <label htmlFor="floating_years" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Skills (Comma Separated) </label>
                                {errors.skills && (
                                    <p className='text-red-500'>{errors.skills.message}</p>
                                )}
                            </div>


                            <div className="relative z-0 w-full mb-9 group">
                                <label htmlFor="floating_education" className="text-sm text-gray-500 dark:text-gray-400 focus:text-teal-600">Education</label>

                                <Controller
                                    name="education"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            onValueChange={field.onChange} {...field}
                                            className={'flex justify-between text-gray-800/90'}
                                        >

                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Undergraduate" id="r2" />
                                                <Label htmlFor="r2">Undergraduate</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Graduate" id="r3" />
                                                <Label htmlFor="r3">Graduate</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Post-Graduate" id="r1" />
                                                <Label htmlFor="r1">Post-Graduate</Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />

                                {errors.education && (
                                    <p className='text-red-500'>{errors.education.message}</p>
                                )}
                            </div>

                            <div className="relative z-0 w-full mb-2 group">
                                <input type="file" accept=".pdf, .doc, .docx" className="border-0 shadow-none block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-600 focus:outline-none focus:ring-0 focus:border-teal-600 peer file:text-teal-600 cursor-pointer file:cursor-pointer" {...register("resume")} />
                                <label htmlFor="floating_resume" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Resume</label>
                                {
                                    errors.resume && (
                                        <p className='text-red-500'>{errors.resume.message}</p>
                                    )
                                }
                            </div>

                            {errorApply?.message && (
                                <p className='text-red-500'>{errorApply?.message}</p>
                            )}
                            {loadingApply && <ClipLoader radius={"23px"} cssOverride={override} color={"orange"} />}
                            <Button type="submit" variant="outline" className="block m-auto pb-5 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800  hover:text-gray-200 w-1/2">Submit</Button>
                        </form>


                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-nonefocus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 hover:text-gray-200">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ApplyJob