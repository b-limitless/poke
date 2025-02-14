import React from "react";
import { Link } from "react-router-dom";
import "./navigation.scss";
import useCurrentUser from "hooks/useCurrentUser";
export default function Navigation() {
  const { isAuthenticated } = useCurrentUser({ shouldNavigate: false });

  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/signin">Signin</Link>
      <Link to="/signup">Signup</Link>

      {/* Private routes  */}
      {isAuthenticated && (
        <>
          <Link to="/favorite">Favorite</Link>
          <Link to="/logout">Logout</Link>
        </>
      )}
    </div>
  );
}
