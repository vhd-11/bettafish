import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '@/components/header';

const AppLayout = () => {
    return (
        <div>
            <div className="grid-background"></div>
            <main className='min-h-screen container'>
                <Header />
                <Outlet />
            </main>
            <div className='p-4 text-center mt-10 bg-transparent'>
                <div> Icons made by <a href="https://www.flaticon.com/authors/cuputo" title="Cuputo"> Cuputo </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </div>
    );
};

export default AppLayout