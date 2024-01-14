import drugMapToDrugGroups from '@/utils/drugMapToDrugGroups';
import getDrugMap from '@/utils/getDrugs';
import SideBar from './SideBar';

export default async function SideBarContainer() {
  const drugMap = await getDrugMap();
  const drugGroups = drugMapToDrugGroups(drugMap);

  return <SideBar drugMap={drugMap} drugGroups={drugGroups} />;
}
