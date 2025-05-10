
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const userName = decodeURIComponent(queryParams.get("name") || "");
    const userEmail = decodeURIComponent(queryParams.get("email") || "");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
      navigate("/", { replace: true }); // Redirect to home
    } else {
      navigate("/login"); // If no token, go to login
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
}

export default GoogleRedirect;
