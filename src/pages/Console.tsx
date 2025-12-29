import { useEffect } from "react";

const Console = () => {
  useEffect(() => {
    // Detect environment based on hostname
    const hostname = window.location.hostname;
    const isStaging = hostname === 'staging.helllo.ai' || hostname.includes('staging');
    
    // Redirect to external dashboard console
    if (isStaging) {
      window.location.replace('https://dash-staging.helllo.ai/console');
    } else {
      window.location.replace('https://dash.helllo.ai/console');
    }
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

