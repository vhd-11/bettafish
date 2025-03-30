// import { useUser } from '@clerk/clerk-react'
// import React, { useEffect } from 'react'
// import BarLoader from "react-spinners/BarLoader";
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button'
// import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
// import companies from "../data/companies.json"
// import Autoplay from 'embla-carousel-autoplay'
// import faq from "../data/faq.json"
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"


// const Onboarding = () => {

//     const {user, isLoaded } = useUser();
//     const navigate=useNavigate();

//     const handleRoleSelection=async(role)=>{
//         await user.update({
//             unsafeMetadata: { role },
//         }).then(()=>{
//             navigate(role === "recruiter" ? "/post-job" : "/jobs")
//         })
//         .catch((err) => {
//             console.error("Error updating role: ",err)
//         })
//     }

//     useEffect(() => {
//         if (user?.unsafeMetadata?.role){
//             navigate(
//                 user?.unsafeMetadata?.role === "recruiter" ? "/post-job"  : "/jobs"
//             )
//         }
//     },[user])

//     if (!isLoaded){
//         return <BarLoader className='m-auto mt-50' width={"66rem"} color={"#F471B6"} />
//     }
    
//     return (
//         <main className='flex flex-col gap-10 sm:gap-20 py-15 sm:py-20 text-white/85'>
//             <section className='text-center'>
//                 <p className=' flex flex-col items-center text-6xl font-dark text-white mb-3 sm:text-7xl lg:text-8xl'>
//                     Reinovating the
//                     <span className='italic'>Job Hunt</span>
//                 </p>
//                 <p className='sm:mt-4 text-white sm:text-xl font-light'>
//                     Fish for both jobs and candidates
//                     with <span className='text-pink-400 font-semibold'>Bettafish</span></p>
//             </section>

//             {/* buttons */}
//             <div className='flex justify-center items-start gap-8'>
//                 <Link to="/jobs">
//                     <div>
//                         <a class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-pink-300 rounded-full shadow-md group bg-pink-400">
//                             <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-pink-400 group-hover:translate-x-0 ease">
//                                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//                             </span>
//                             <span class="absolute flex items-center justify-center w-full h-full text-pink-00 transition-all duration-400 transform group-hover:translate-x-full ease bg-pink-400" onClick={() => handleRoleSelection("candidate")} 
//                             >Candidate</span>
//                             <span class="relative invisible">Candidate</span>
//                         </a>
//                     </div>
//                 </Link>

//                 <Link to="/post-job">
//                     <div>
//                         <a class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-pink-300 rounded-full shadow-md group bg-pink-400">
//                             <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-220 -translate-x-full bg-pink-400 group-hover:translate-x-0 ease">
//                                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//                             </span>
//                             <span class="absolute flex items-center justify-center w-full h-full text-pink-00 transition-all duration-300 transform group-hover:translate-x-full ease bg-pink-400" onClick={() => handleRoleSelection("recruiter")} >Employer</span>
//                             <span class="relative invisible"
//                             >Employer</span>
//                         </a>
//                     </div>
//                 </Link>
//             </div>

//             {/* carousel */}
//             <Carousel plugins={[
//                 Autoplay({
//                     delay: 1500,
//                 }),
//             ]}
//                 className="w-full py-8 px-6">
//                 <CarouselContent className='flex gap-10 sm:gap-20 items-center'>
//                     {companies.map(({ name, id, path }) => {

//                         return (
//                             <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
//                                 <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
//                             </CarouselItem>
//                         );
//                     })}
//                 </CarouselContent>
//             </Carousel>

//             {/* accordion */}
//             {/* <div className='px-6 sm:px-12'>Frequently Asked Questions</div> */}
//             <Accordion className='py-7 px-6 mx-10 sm:mx-13 sm:px-13 bg-rose-300/35 shadow-2xl' type="single" collapsible>
//                 {faq.map((faqIt, index) => {
//                     return (
//                     <AccordionItem className='text-white' key={index} value={`item-${index + 1}`}>
//                         <AccordionTrigger className='sm:text-base'>{faqIt.question}</AccordionTrigger>
//                         <AccordionContent>
//                             {faqIt.answer}
//                         </AccordionContent>
//                     </AccordionItem>
//                     );
//                 })
//                 }

//             </Accordion>
//             </main>
//     )
// }

// export default Onboarding;