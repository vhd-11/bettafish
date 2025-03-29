import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import companies from "../data/companies.json"

const LandingPage = () => {
    return (
        <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
            <section className='text-center'>
                <p className=' flex flex-col items-center text-6xl font-dark text-white mb-3 sm:text-7xl lg:text-8xl'>
                    Reinovating the
                    <span className='italic'>Job Hunt</span>
                </p>
                <p className='sm:mt-4 text- sm:text-xl'>
                    Fish for both jobs and candidates
                    with <span className='text-pink-400 font-semibold'>Bettafish</span></p>
            </section>
            <div className='flex justify-center items-start gap-8'>
                <Link to="/jobs">
                    <div>
                        <a href="#_" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-pink-400 transition duration-300 ease-out border-2 border-pink-400 rounded-full shadow-md group">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-400 group-hover:translate-x-0 ease">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-pink-00 transition-all duration-300 transform group-hover:translate-x-full ease">Candidate</span>
                            <span class="relative invisible">Candidate</span>
                        </a>
                    </div>
                </Link>

                <Link to="/post-job">
                    <div>
                    <a href="#_" class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-pink-400 transition duration-300 ease-out border-2 border-pink-400 rounded-full shadow-md group">
                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-pink-400 group-hover:translate-x-0 ease">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span class="absolute flex items-center justify-center w-full h-full text-pink-00 transition-all duration-300 transform group-hover:translate-x-full ease">Employer</span>
                            <span class="relative invisible">Employer</span>
                            </a>
                    </div>
                </Link>
            </div>

            <section>
                {/* carousel */}
                {/* cards */}
                <Carousel className={"w-full py-10"}>
                    <CarouselContent>
                        {companies.map(() => {

                                return (
                                    <CarouselItem>
                                        
                                    </CarouselItem>
                                )
                            }
                        )}
                    </CarouselContent>
                </Carousel>
            </section>

            {/* accordion */}
        </main>
    )
}

export default LandingPage