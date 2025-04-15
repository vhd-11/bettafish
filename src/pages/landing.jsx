import React from 'react'
import { useUser } from '@clerk/clerk-react'
// import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
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
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleRoleSelection = async (role) => {
        await user.update({
            unsafeMetadata: { role },
        }).then(() => {
            navigate(role === "recruiter" ? "/post-job" : "/job-listing")
        })
            .catch((err) => {
                console.error("Error updating role: ", err)
            })
    }

    // useEffect(() => {
    //     if (user?.unsafeMetadata?.role){
    //         navigate(
    //             user?.unsafeMetadata?.role === "recruiter" ? "/post-job"  : "/job-listing"
    //         )
    //     }
    // },[user])


    return (
        <main className='flex flex-col gap-8 lg:gap-14 xl:gap-17 py-15 sm:py-20'>




            <section className='text-center relative pl-14'>
                <img src="https://blush.design/api/download?shareUri=DSR_6FuEQW0CLOmI&c=Skin_0%7E1fad66&w=800&h=800&fm=png" alt="star" className='w-16 sm:w-22 lg:w-54 absolute -top-10 left-5 sm:left-16 lg:left-27 rotate-335 lg:-top-15'></img>
                
                <img
                    src="https://blush.design/api/download?shareUri=0QcVzOFDtot3OIWC&c=New%2520Palette%25201_0%7Effffff&w=800&h=800&fm=png"
                    alt="woman walking"
                    className='w-20 sm:w-28 lg:w-66 absolute -top-10 left-5 sm:left-16 lg:left-22 rotate-335 lg:-top-20'
                />
                <p className='whitespace-prewrap text-4xl md:text-5xl font-medium text-black mb-3 lg:text-6xl xl:text-7xl'>
                    Reinovating the
                    Job <span className='text-white bg-teal-600 my-3 py-0 leading-5'>Hunt</span>
                </p>
                <p className='mt-2 text-base sm:text-xl font-medium text-gray-400 pl-13'>
                    Fish for both jobs and candidates
                    with <span className='text-teal-600 font-semibold'>Bettafish</span>
                </p>
            </section>



            {/* buttons */}
            <div className='flex justify-center items-start gap-5'>
                <Link to="/job-listing">
                    <div>
                        <a onClick={() => {
                            handleRoleSelection("candidate")
                        }} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black rounded-full shadow-md group bg-black">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-black group-hover:translate-x-0 ease">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-teal-00 transition-all duration-400 transform group-hover:translate-x-full ease bg-black">Candidate</span>
                            <span class="relative invisible">Candidate</span>
                        </a>
                    </div>
                </Link>

                <Link to="/post-job">
                    <div>
                        <a onClick={() => {
                            handleRoleSelection("recruiter")
                        }} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-black rounded-full shadow-md group bg-black">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-black group-hover:translate-x-0 ease">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-teal-00 transition-all duration-400 transform group-hover:translate-x-full ease bg-black">Recruiter</span>
                            <span class="relative invisible">Recruiter</span>
                        </a>
                    </div>
                </Link>
            </div>

            {/* 2nd images */}

            <div className="relative flex justify-end mt-4 mb-[-40px] z-10">
                <img
                    src="https://blush.design/api/download?shareUri=bosCr9Fux&w=800&h=800&fm=png"
                    className='w-24 sm:w-33 lg:w-73 absolute -top-23 rotate-12 lg:-top-59 lg:right-17'
                />
            </div>


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

            {/* accordion */}
            {/* <div className='px-6 sm:px-12'>Frequently Asked Questions</div> */}
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
    )
}

export default LandingPage