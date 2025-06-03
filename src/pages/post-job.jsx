import React from 'react'
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectGroup, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPlusIcon } from 'lucide-react';
import { State } from 'country-state-city';
import useFetch from '@/hooks/use-fetch';
import { getCompanies } from '@/api/apiCompanies';
import { useUser } from '@clerk/clerk-react';
import { Progress } from "@/components/ui/progress"
import { Form } from '@/components/ui/form';
// import { Controller, useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';

const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Select a location" }),
    company_id: z.string().min(1, { message: "Select or Add a new Company" }),
    requirements: z.string().min(1, { message: "Requirements are required" }),
})

const PostJob = () => {

    const { isLoaded, user } = useUser

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
        fn: fnCompanies,
        data: companies = [],
        loading: loadingCompanies
    } = useFetch(getCompanies);

    return (
        <>
            {/* <Progress value={45} className={"w-9/12 m-auto h-1"} /> */}
            <div className='text-7xl font-dark text-black mb-3 sm:text-5xl lg:text-7xl text-center mt-6'>
                <span className='underline underline-offset-6 decoration-teal-700 '>Post</span> Jobs
            </div>

            <form className='flex flex-col'>
                <div className="flex flex-col items-start w-3/4 m-auto my-4">
                    <Label htmlFor="title" >Job Title</Label>
                    <Input placeholder="Add Title" {...register("title")} className=" my-4 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1" />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>

                <div className="flex flex-col items-start w-3/4 m-auto my-4">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea placeholder="Job Description" {...register("description")} className="my-4 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1" />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>

                <div className="flex flex-col items-start w-3/4 m-auto gap-4">
                    <Label htmlFor="location">Job Location</Label>
                    <Select className="w-2/3">
                        <SelectTrigger className="w-[74vw] bg-transparent rounded-4xl text-sm outline outline-transparent border border-gray-200 focus-visible:border-teal-800/50 focus-visible:ring-teal-800/50 focus-visible:ring-1
                    
">
                            <MapPlusIcon color="#005F59" />
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
                </div>
            </form>

        </>
    )
}

export default PostJob