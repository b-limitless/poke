import { APIs } from "utils/apis";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "utils/request";

export default function useCurrentUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const navigateToSignIn = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      await request({
        url: APIs.auth.currentUser,
        method: "post",
        navigations: navigateToSignIn, // This will redirect on unauthorized
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.log(`An unknown error occurred: ${err}`);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [navigateToSignIn]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { isAuthenticated, isLoading };
}
