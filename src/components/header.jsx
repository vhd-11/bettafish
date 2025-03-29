import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';

const Header = () => {
    return (
        <>
            <nav className='py-3 px-2  items-center flex justify-between text-'>
                <div className='flex justify-items-start gap-1 text-pink-400'>
                    <Link>
                        <img src="/koi-fish.png" className='h-10' alt="logo" />
                    </Link>
                </div>

                <Button variant="outline"> Login </Button>

                    {/* <SignedOut>
                        <SignInButton />
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn> */}
            </nav>
        </>
    );
};

export default Header