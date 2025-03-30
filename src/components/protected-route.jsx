import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

// redirect user tosign-in no matter the location
const ProtectedRoute = ({ children }) => {
    // takes all user details and signedinstate
    // eslint-disable-next-line no-unused-vars
    const { isSignedIn, user, isLoaded } = useUser();

    // takes path user is at rn
            // eslint-disable-next-line no-unused-vars
    const { pathName } = useLocation();


    // if details are loaded in and user is not signed in and signed in is undefined we redirect user to sign in
    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />
    }


    // TODO check onboarding status
    return children;

};

export default ProtectedRoute;