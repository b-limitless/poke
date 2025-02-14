import React, { ReactNode } from "react";
import "./template.scss";

interface ITemplate {
  children: ReactNode;
}
export default function Template({ children }: ITemplate) {
  return <div className="container">{children}</div>;
}
