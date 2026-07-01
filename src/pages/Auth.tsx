import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDashboardOrigin } from "@/lib/dashboard";

const Auth = () => {
  const location = useLocation();

  useEffect(() => {
    const destination = `${getDashboardOrigin()}${location.pathname}${location.search}${location.hash}`;
    window.location.replace(destination);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-xl text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Auth;
