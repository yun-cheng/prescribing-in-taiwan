import {
  openedGroupCollapseAtom,
  selectedDrugIdAtom,
  sideBarOpenAtom,
} from '@/atoms/sideBar';
import { Drug } from '@/types/drug';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

type Props = {
  groupName: string;
  groupData: Drug[];
};

export default function GroupCollapseList({ groupName, groupData }: Props) {
  const router = useRouter();

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [openedGroupCollapse, setOpenedGroupCollapse] = useAtom(
    openedGroupCollapseAtom,
  );
  const [selectedDrugId] = useAtom(selectedDrugIdAtom);

  const setSideBarOpen = useSetAtom(sideBarOpenAtom);

  const isOpen = openedGroupCollapse === groupName;

  const handleClickGroupCollapse = () => {
    setOpenedGroupCollapse(isOpen ? '' : groupName);
  };

  const handleSelectDrug = (drugId: string) => {
    router.push(`/atc/${drugId}`);

    if (!lgUp) {
      setSideBarOpen(false);
    }
  };

  return (
    <div>
      <ListItemButton onClick={handleClickGroupCollapse}>
        <ListItemText primary={groupName} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout={300}>
        <List component="div" disablePadding>
          {groupData.map((drug) => (
            <ListItemButton
              key={drug.id}
              selected={drug.id === selectedDrugId}
              onClick={() => handleSelectDrug(drug.id)}
            >
              <ListItemText sx={{ pl: 4 }} primary={drug.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
