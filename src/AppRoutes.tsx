import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import { ROUTES } from "./lib/consts/routes";
import PublicLayout from "./layout/PublicLayout";
import LoadingOverlayer from "./components/LoadingOverlayer";
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LeadsPage = lazy(() => import("./pages/LeadsPage"));
const LeadProfilePage = lazy(() => import("./pages/LeadProfilePage"));
const NewEmailPage = lazy(() => import("./pages/NewEmailPage"));
const TagsPage = lazy(() => import("./pages/TagsPage"));
const EmailsPage = lazy(() => import("./pages/EmailsPage"));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />, // Layout that wraps around all pages
    children: [
      {
        path: ROUTES.HOME,
        element: <>HOME</>,
      },
      {
        path: ROUTES.LEADS.ROOT,
        element: <LeadsPage />,
      },
      {
        path: ROUTES.LEADS.PROFILE,
        element: <LeadProfilePage />,
      },
      {
        path: ROUTES.EMAIL.NEW,
        element: <NewEmailPage />,
      },
      {
        path: ROUTES.EMAIL.ROOT,
        element: <EmailsPage />,
      },
      {
        path: ROUTES.TAGS.ROOT,
        element: <TagsPage />,
      },
    ],
  },
  {
    path: ROUTES.AUTH.ROOT,
    element: <PublicLayout />,
    children: [
      {
        path: ROUTES.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.AUTH.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: ROUTES.ONBOARDING.ROOT,
    element: <>ONBOARDING</>,
    children: [],
  },
  {
    path: "*",
    element: <>NotFoundPage</>, // Catch-all for undefined routes
  },
]);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingOverlayer />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRoutes;
