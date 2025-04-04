import React from "react";
import "./MainLayout.css";

function MainLayout({ children }) {
  return <section className="main-layout">{children}</section>;
}

export { MainLayout };
