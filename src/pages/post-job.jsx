import React from 'react'
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPlusIcon, MapIcon, PinIcon, BuildingIcon } from 'lucide-react';
import { State } from 'country-state-city';
import useFetch from '@/hooks/use-fetch';
import { getCompanies } from '@/api/apiCompanies';
import { useUser } from '@clerk/clerk-react';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';


const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Select a location" }),
    company_id: z.string().min(1, { message: "Select or Add a new Company" }),
    requirements: z.string().min(1, { message: "Requirements are required" }),
})

const PostJob = () => {

    const { isLoaded, user } = useUser();
    const [company_id, setCompany_id] = useState("");

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { location: "", company_id: "", requirements: "" },
        resolver: zodResolver(schema),
    })

    const {
        loading: loadingCompanies,
        fn: fnCompanies,
        data: companies = [],
    } = useFetch(getCompanies);

    useEffect(() => {
        if (isLoaded) fnCompanies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    const override = {
        display: "block",
        margin: "auto"
    }

    if (!isLoaded || loadingCompanies) {
        return <ClipLoader width={"5rem"} radius={"5rem"} cssOverride={override} color={"green"} />
    }

    if (user?.unsafeMetadata?.role !== "recruiter") {
        return <Navigate to="/jobs" />;
    }

    return (
        <>
            {/* <Progress value={45} className={"w-9/12 m-auto h-1"} /> */}
            <div className='text-7xl font-dark text-black mb-3 sm:text-5xl lg:text-7xl text-center mt-6'>
                <span className='underline underline-offset-6 decoration-teal-700 '>Post</span> Jobs
            </div>

            <form className='flex flex-col'>
                <div className="flex flex-col items-start w-3/4 m-auto">
                    <Label htmlFor="title" className={"text-md lg:text-xl"} >Job Title</Label>
                    <Input placeholder="Add Title" {...register("title")} className=" my-4 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1" />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>

                <div className="flex flex-col items-start w-3/4 m-auto my-4">
                    <Label htmlFor="description" className={"text-md lg:text-xl"}>Job Description</Label>
                    <Textarea placeholder="Job Description" {...register("description")} className="my-4 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1" />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

                {/* LOCATION CATEGORY */}
                <div className="flex flex-col items-start w-3/4 m-auto gap-4">
                    <Label htmlFor="location" className={"text-md lg:text-xl"}>Job Location</Label>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                className="w-2/3">
                                <SelectTrigger className="w-[74vw] bg-transparent rounded-4xl text-sm outline outline-transparent border border-gray-200 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1
                    
">
                                    <PinIcon color="#005F59" />
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent className="rounded-4xl">
                                    <SelectGroup>
                                        {State.getStatesOfCountry("IN").map(({ name }) => (
                                            <SelectItem key={name} value={name}>{name}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                {errors.location && <p className='text-red-500'>{errors.location.message}</p>}

                {/* COMPANIES CATEGORY */}
                <div className="flex flex-col items-start w-3/4 m-auto gap-4 pt-7">
                    <Label htmlFor="company_id" className={"text-md lg:text-xl"}>Job Company</Label>
                    <Controller
                        name="company_id"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-[74vw] bg-transparent rounded-4xl text-sm outline outline-transparent border border-gray-200 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1">
                                    <BuildingIcon color="#005F59" />
                                    <SelectValue placeholder="Select Company" >
                                        {field.value
                                            ? companies?.find((com) => com.id === Number(field.value))
                                                ?.name
                                            : "Company"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-4xl">
                                    <SelectGroup className="bg-white text-black">
                                        {companies?.map(({ name, id }) => (
                                            <SelectItem key={name} value={id}>
                                                {name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.company_id && (
                        <p className="text-red-500">{errors.company_id.message}</p>
                    )}

                    <Controller
                        name="company_id"
                        control={control}
                        render={({ field }) =>( <MDEditor value={field.value} onChange={field.onChange} />
                        )
                    }
                    />

                    {errors.requirements && (
                        <p className='text-red-500'>{errors.requirements.message}</p>
                    )}


                    {/* TODO: ADD COMPANY DRAWER */}

                    {/* TODO: EMPLOYMENT TYPE: FULL TIME HALF TIME */}

                    {/* TODO: WORK APPROACH: ONSITE N REMOTE */}
                </div>
            </form>

        </>
    )
}

export default PostJob