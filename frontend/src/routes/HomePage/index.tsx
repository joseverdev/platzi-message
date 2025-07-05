import "./HomePage.css";

import { MainHeader } from "../../components/MainHeader/MainHeader";
import { MainLayout } from "../../components/templates/MainLayout/MainLayout";
// import { MainFooter } from "../../components/MainFooter/MainFooter";
import { Messages } from "../../components/organisms/Messages";
import { Nav } from "../../components/organisms/Nav";

function HomePage() {
  return (
    <>
      <MainLayout>
        <MainHeader />
        <main>
          <Nav />
          <Messages />
        </main>
      </MainLayout>
    </>
  );
}

export { HomePage };
