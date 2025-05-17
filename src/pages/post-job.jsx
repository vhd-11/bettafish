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

const schema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    location: z.string().min(1, { message: "Select a location" }),
    company_id: z.string().min(1, { message: "Select or Add a new Company" }),
    requirements: z.string().min(1, { message: "Requirements are required" }),
})

const PostJob = () => {

    const {isLoaded, user} = useUser

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
            <div className='text-7xl font-dark text-black mb-3 sm:text-5xl lg:text-7xl text-center mt-6'>
                <span className='underline underline-offset-6 decoration-teal-700 '>Post</span> Jobs
            </div>

            <form>
                <Input placeholder="Job Title" {...register("title")} className={"m-auto w-2/3 my-12"} />
                {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

                <Textarea placeholder="Job Description" {...register("description")} className={" w-6/7 m-auto my-12"} />
                {errors.description && (
                    <p className='text-red-500'>{errors.description.message}</p>
                )}

                <Select className='lg:h-20 border-none focus:ring-0 focus-visible:ring-ring/0' 
                
                // value={location} 
                
                // onValueChange={(value) => setLocation(value)}
                
                >
                    <SelectTrigger className='bg-transparent rounded-4xl lg:text-[15px] sm:text-sm'>
                        <MapPlusIcon color="#005F59" />
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className={'rounded-4xl'}>
                        <SelectGroup className='bg-whitetext-black'>
                            {State.getStatesOfCountry("IN").map(({ name }) => {
                                return (<SelectItem key={name} value={name}>{name}</SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </form>
        </>
    )
}

export default PostJob