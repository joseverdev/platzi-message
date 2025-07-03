import "./HomePage.css";

import { MainHeader } from "../../components/MainHeader/MainHeader";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { MainFooter } from "../../components/MainFooter/MainFooter";
import { Messages } from "../../components/Messages/Messages";
import Nav from "../../components/organisms/Nav/Nav";

function HomePage() {
  return (
    <>
      <MainLayout>
        <MainHeader />
        <main>
          <Nav />
          <Messages />
        </main>
        {/* <MainFooter /> */}
      </MainLayout>
    </>
  );
}

export { HomePage };
