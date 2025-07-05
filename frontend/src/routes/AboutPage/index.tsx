import React from "react";
import { MainLayout } from "../../components/templates/MainLayout/MainLayout";
import { AboutHeader } from "../../components/AboutHeader";
import { AboutContent } from "../../components/organisms/AboutContent/AboutContent";

function AboutPage() {
  return (
    <MainLayout>
      <AboutHeader />
      <AboutContent />
    </MainLayout>
  );
}

export { AboutPage };
