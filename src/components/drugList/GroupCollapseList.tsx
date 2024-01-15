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
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  groupName: string;
  groupData: Drug[];
};

export default function GroupCollapseList({ groupName, groupData }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [openedGroupCollapse, setOpenedGroupCollapse] = useAtom(
    openedGroupCollapseAtom,
  );
  const [selectedDrugId, setDrugId] = useAtom(selectedDrugIdAtom);

  const setSideBarOpen = useSetAtom(sideBarOpenAtom);

  const isOpen = openedGroupCollapse === groupName;

  const handleClickGroupCollapse = () => {
    setOpenedGroupCollapse(isOpen ? '' : groupName);
  };

  const handleClickDrug = (drugId: string) => {
    if (pathname.startsWith('/atc/')) {
      setDrugId(drugId);

      const newUrl = `/atc/${drugId}`;
      window.history.replaceState(
        { ...window.history.state, as: newUrl, url: newUrl },
        '',
        newUrl,
      );
    } else {
      router.push(`/atc/${drugId}`);
    }

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
              onClick={() => handleClickDrug(drug.id)}
            >
              <ListItemText sx={{ pl: 4 }} primary={drug.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
