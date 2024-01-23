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
  ListSubheader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

type Props = {
  groupName: string;
  groupData: Drug[];
  index: number;
};

export default function GroupCollapseList({
  groupName,
  groupData,
  index,
}: Props) {
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
    <>
      <ListSubheader
        className="bg-slate-50"
        sx={{ zIndex: index + 3 }}
        component="div"
        color="inherit"
        disableGutters
      >
        <ListItemButton onClick={handleClickGroupCollapse}>
          <ListItemText primary={groupName} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListSubheader>
      <Collapse in={isOpen} timeout={300}>
        <List
          className="bg-slate-50"
          sx={{ zIndex: index + 2 }}
          component="div"
          disablePadding
        >
          {groupData.map((drug) => (
            <ListItemButton
              key={drug.id}
              selected={drug.id === selectedDrugId}
              onClick={() => handleSelectDrug(drug.id)}
            >
              <ListItemText className="pl-4" primary={drug.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
