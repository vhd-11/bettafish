import { Button } from './components/ui/button'
import "./App.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landing';
// import Onboarding from './pages/onboarding';
import JobListing from './pages/job-listing';
import JobPage from './pages/job';
import MyJob from './pages/my-job';
import PostJob from './pages/post-job';
import SavedJob from './pages/saved-job';
import ProtectedRoute from './components/protected-route';
// import { ThemeProvider } from "@/components/theme-provider"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      // {
      //   path: "/onboarding",
      //   element: (
      //     <ProtectedRoute>
      //       <Onboarding />
      //     </ProtectedRoute>
      //   ),
      // },
      {
        path: "/job-listing",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),

      },
      {
        path: "/my-job",
        element: (
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
        ),
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