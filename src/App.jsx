import { Button } from './components/ui/button'
import "./App.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import JobListing from './pages/job-listing';
import JobPage from './pages/job';
import MyJob from './pages/my-job';
import PostJob from './pages/post-job';
import SavedJob from './pages/saved-job';
import { ThemeProvider } from "@/components/theme-provider"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />
      },
      {
        path: "/job-listing",
        element: <JobListing />
      },
      {
        path: "/my-job",
        element: <MyJob />
      },
      {
        path: "/jobs",
        element: <JobPage />
      },
      {
        path: "/post-job",
        element: <PostJob />
      },
      {
        path: "/saved-job",
        element: <SavedJob />
      }

    ],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App