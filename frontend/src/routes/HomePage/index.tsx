import './index.css';

import { MainHeader } from '@/components/organisms/MainHeader';
import { MainLayout } from '../../components/templates/MainLayout/MainLayout';
import { Messages } from '../../components/organisms/Messages';
import { Nav } from '../../components/organisms/Nav';

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
