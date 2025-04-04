import React from "react";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { AboutHeader } from "../../components/AboutHeader/AboutHeader";
import { AboutContent } from "../../components/AboutContent/AboutContent";

function AboutPage() {
  return (
    <MainLayout>
      <AboutHeader />
      <AboutContent />
    </MainLayout>
  );
}

export { AboutPage };
