import React, { FC, ReactElement, useEffect, useState } from "react";
import LoadingOverlayer from "@/components/LoadingOverlayer";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetUser } from "@/lib/api/user/queries";
import { ROUTES } from "@/lib/consts/routes";

interface RouteGuardProps {
  children: React.ReactNode;
}

const publicPages = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.REGISTER_CONFIRMATION,
];

const RouteGuard: FC<RouteGuardProps> = ({ children }): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const [checking, setChecking] = useState(true);
  const { data: user, isFetched } = useGetUser();
  console.log(user, isFetched);
  useEffect(() => {
    if (!isFetched) return;
    setChecking(true);

    const handleRedirect = (path: string) => {
      navigate(path, { replace: true });
    };

    if (user) {
      if (!user.firstName && path !== ROUTES.ONBOARDING.USER) {
        handleRedirect(ROUTES.ONBOARDING.USER);
      } else if (
        !user.organization &&
        !!user.firstName &&
        path !== ROUTES.ONBOARDING.ORGANIZATION
      ) {
        handleRedirect(ROUTES.ONBOARDING.ORGANIZATION);
      } else if (
        path === ROUTES.ONBOARDING.ORGANIZATION &&
        !!user.organization
      ) {
        handleRedirect(ROUTES.LEADS.ROOT);
      } else if (publicPages.includes(path)) {
        handleRedirect(ROUTES.LEADS.ROOT);
      } else {
        setChecking(false);
      }
    } else {
      if (!publicPages.includes(path)) {
        handleRedirect(ROUTES.AUTH.LOGIN);
      } else {
        setChecking(false);
      }
    }
  }, [path, user, isFetched]);

  if (checking || !isFetched) {
    return <LoadingOverlayer />;
  }

  return <>{children}</>;
};

export default RouteGuard;
