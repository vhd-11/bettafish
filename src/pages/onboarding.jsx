import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import companies from "../data/companies.json"
import Autoplay from 'embla-carousel-autoplay'
import faq from "../data/faq.json"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Onboarding = () => {

    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    const navigateUser = (currRole) => {
        navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
    };

    const handleRoleSelection = async (role) => {
        await user
            .update({ unsafeMetadata: { role } })
            .then(() => {
                console.log(`Role updated to: ${role}`);
                navigateUser(role);
            })
            .catch((err) => {
                console.error("Error updating role:", err);
            });
    };

    useEffect(() => {
        if (user?.unsafeMetadata?.role) {
            navigate(
                user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/job-listing"
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    if (!isLoaded) {
        const override = {
            display: "block",
            margin: "auto",
        };
        return <ClipLoader width={"5rem"} radius={"5rem"} cssOverride={override} color={"#F471B6"} />
    }

    return (
            <>
                <main className='flex flex-col gap-8 lg:gap-14 xl:gap-17 py-15 sm:py-20'>
                    <div className='flex justify-center xl:gap-20'>
                        <div className='flex-row'>
    
                            <section className='pl-13'>
                                <p className='  font-medium text-black mb-3 lg:text-6xl xl:text-7xl text-4xl md:text-5xl'>
                                    <span className='lg:text-7xl xl:text-8xl text-5xl md:text-6xl tracking-tight lg:tracking-tighter'>Reinovating  </span>
                                    <div className='mt-1 lg:mt-4'>
                                        the Job <span className='text-white bg-teal-600 my-3 py-0 px-3'>Hunt</span>
                                    </div>
                                </p>
                                <p className='mt-2 text-base sm:text-xl font-medium text-gray-400'>
                                    Fish for both jobs and candidates
                                    with <span className='text-teal-600 font-semibold'>Bettafish</span>
                                </p>
                            </section>
    
    
    
                            {/* buttons */}
                            <div className='flex justify-center items-start gap-5 pl-13 mt-6 md:mt-8 lg:mt-10 xl:mt-13'>
                                {/* <Link to="/job-listing"> */}
                                    <div>
                                        <a class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black rounded-full shadow-md group bg-black">
                                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-black group-hover:translate-x-0 ease">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </span>
                                            <span class="absolute flex items-center justify-center w-full h-full text-teal-00 transition-all duration-400 transform group-hover:translate-x-full ease bg-black">Candidate</span>
                                            <span class="relative invisible">Candidate</span>
                                        </a>
                                    </div>
                                {/* </Link> */}
    
                                {/* <Link to="/post-job"> */}
                                    <div>
                                        <a onClick={() => handleRoleSelection("recruiter")}
                                        class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black rounded-full shadow-md group bg-black">
                                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-black group-hover:translate-x-0 ease">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </span>
                                            <span class="absolute flex items-center justify-center w-full h-full text-teal-00 transition-all duration-400 transform group-hover:translate-x-full ease bg-black">Recruiter</span>
                                            <span class="relative invisible">Recruiter</span>
                                        </a>
                                    </div>
                                {/* </Link> */}
                            </div>
                        </div>
    
                        {/* running woman img */}
                        <div className=''>
                            <img
                                src="public/RunningDoodle.svg"
                                className=' w-78 h-auto rotate-326'
                            />
                        </div>
                    </div>
    
                    {/* accordion */}
                    {/* <div className='px-6 sm:px-12'>Frequently Asked Questions</div> */}
    
                    <div className='px-13 font-medium -mb-4 lg:text-6xl xl:text-7xl text-4xl md:text-5xl text-teal-600 lg:-mb-12'>FAQs</div>
                    <Accordion className='py-7 px-6 mx-10 sm:mx-13 sm:px-13 bg-white shadow-2xl' type="single" collapsible>
                        {faq.map((faqIt, index) => {
                            return (
                                <AccordionItem className='text-black' key={index} value={`item-${index + 1}`}>
                                    <AccordionTrigger className='sm:text-base'>{faqIt.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faqIt.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })
                        }
    
                    </Accordion>
    
    
                </main >
                <footer className='flex-row bg-teal-600 static bottom-0 bg-repeat'>
                    <p className='pt-9 pb-5 text-base sm:text-xl font-medium text-white text-center'>Trusted by 100+ companies</p>
                    {/* carousel */}
                    <Carousel plugins={[
                        Autoplay({
                            delay: 930,
                        }),
                    ]}
                        className="w-full py-8 px-6">
                        <CarouselContent className='flex gap-10 sm:gap-20 items-center'>
                            {companies.map(({ name, id, path }) => {
    
                                return (
                                    <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
                                        <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                    </Carousel>
                </footer>
            </>
    
        )
}

export default Onboarding;