import ChartSetContainer from '@/components/chart/ChartSetContainer';
import Header from '@/components/common/Header';
import MainContainer from '@/components/common/MainContainer';
import SideBarContainer from '@/components/common/SideBar/SideBarContainer';
import Description from '@/components/description/Description';

export default async function Home() {
  return (
    <main>
      <div className="flex">
        <SideBarContainer />
        <MainContainer>
          <Header />
          <div className="p-6">
            <ChartSetContainer />
            <Description />
          </div>
        </MainContainer>
      </div>
    </main>
  );
}
