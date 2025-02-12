import React, { ReactNode } from "react";
import "./template.scss";

interface ITemplate {
  children: ReactNode;
  message?: string;
}
export default function Template({
  message = "Hello World",
  children,
}: ITemplate) {
  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>{message}</h1>

        {children}
      </div>
    </div>
  );
}
