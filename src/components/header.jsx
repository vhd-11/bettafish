import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignIn } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { PenBox } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);


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
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>

            {
                showSignIn && <div>
                    <SignIn 
                        signUpForceRedirectUrl='/onboarding'
                        fallbackRedirectUrl='/onboarding'
                    />
                </div>
            }
        </>
    );
};

export default Header