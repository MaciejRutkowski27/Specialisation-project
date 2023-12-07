import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DelayedPageTransition = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Set a delay of 2000 milliseconds (2 seconds)
    const delay = 3250;

    // Use setTimeout to wait for the specified delay before updating state
    const timeoutId = setTimeout(() => {
      // Update state to trigger the page transition
      setRedirect(true);
    }, delay);

    // Clear the timeout to prevent unnecessary state updates if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  // Use navigate to redirect to "/sign-in" when redirect is true
  useEffect(() => {
    if (redirect) {
      navigate("/sign-in");
    }
  }, [redirect, navigate]);

  // Render the current or redirected content based on the state
  return (
    <div>
      {redirect ? (
        // If redirect is true, render the content for the new page
        <div>
          
        </div>
      ) : (
        // If redirect is false, render the content for the current page
        <div>
          
        </div>
      )}
    </div>
  );
};

export default DelayedPageTransition;
