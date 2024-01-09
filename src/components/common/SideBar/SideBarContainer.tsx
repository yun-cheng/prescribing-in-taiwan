import getDrugs from '@/utils/getDrugs';
import SideBar from './SideBar';

export default async function SideBarContainer() {
  const drugData = await getDrugs();

  return <SideBar drugData={drugData} />;
}
