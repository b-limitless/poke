import Template from "common/Template/Template";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Template message="Hello World">
      <div className="navigation">
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </Template>
  );
}
