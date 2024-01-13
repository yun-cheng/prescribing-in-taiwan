import getDrugs from '@/utils/getDrugs';
import SideBar from './SideBar';

export default async function SideBarContainer() {
  const drugGroups = await getDrugs();

  return <SideBar drugGroups={drugGroups} />;
}
