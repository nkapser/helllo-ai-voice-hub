import { useEffect } from "react";
import { getDashboardUrl } from "@/lib/dashboard";

const Console = () => {
  useEffect(() => {
    window.location.replace(getDashboardUrl("/console"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-xl text-gray-600">Redirecting to console...</p>
      </div>
    </div>
  );
};

export default Console;

