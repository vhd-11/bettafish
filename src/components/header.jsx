import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
    return (
        <>
            <nav className='py-3 px-2  items-center flex justify-between text-white/80'>
                <div className='flex justify-items-start gap-1'>
                <Link>
                    <img src="/koi-fish.png" className='h-10' alt="logo" />
                </Link>
                <div className='mt-1 text-2xl'>Bettafish</div>
                </div>
                    <Button variant="outline"> Login </Button>
            </nav>
        </>
    );
};

export default Header