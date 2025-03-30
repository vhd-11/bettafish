import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignIn } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { BookmarkPlusIcon, BriefcaseBusiness, BriefcaseBusinessIcon, PenBox } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const[search, setSearch]=useSearchParams();

    useEffect(()=> {
        if(search.get('sign-in')){
            setShowSignIn(true);
        }
    },[search])

    // disappear sign in when clicking outside sign in
    const handleOverlayClick =(e) =>{
        if (e.target === e.currentTarget){
            setShowSignIn(false);
        }
    }

    return (
        <>
            <nav className='py-3 px-2  items-center flex justify-between text-'>
                <div className='flex justify-items-start gap-1 text-pink-400'>
                    <Link>
                        <img src="/koi-fish.png" className='h-10' alt="logo" />
                    </Link>
                </div>

                <div className='flex gap-8'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)
                        }> Login 
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <Button variant='destructive' className='rounded-full'>
                            <PenBox size={20} className='mr-2'></PenBox>
                            Post Job
                        </Button>
                        <Link to="/post-job"></Link>
                        <UserButton 
                        appearance={{
                                elements: {
                                    avatarBox: "mr-3 w-20 h-20",
                                },
                            }
                        }
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label = "My Jobs"
                                    labelIcon={<BriefcaseBusinessIcon size={15} />}
                                    href='/my-jobs'
                                />
                                <UserButton.Link 
                                label = "Saved Jobs"
                                labelIcon={<BookmarkPlusIcon size={15} />}
                                href='/saved-job'
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {
                showSignIn && 
                (<div className='absolute inset-0 flex items-center justify-center bg-black/20 z-1'
                onClick={handleOverlayClick}
                >
                    <SignIn 
                        signUpForceRedirectUrl='/onboarding'
                        fallbackRedirectUrl='/onboarding'
                    />
                </div>
                )
            }
        </>
    );
};

export default Header