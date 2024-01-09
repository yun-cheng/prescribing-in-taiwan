import { openedGroupCollapseAtom, selectedDrugAtom } from '@/atoms/sideBar';
import { DrugType } from '@/types/drug';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { useAtom } from 'jotai';

type Props = {
  groupName: string;
  groupData: DrugType[];
};

export default function GroupCollapseList({ groupName, groupData }: Props) {
  const [openedGroupCollapse, setOpenedGroupCollapse] = useAtom(
    openedGroupCollapseAtom,
  );
  const [selectedDrug, setDrug] = useAtom(selectedDrugAtom);

  const isOpen = openedGroupCollapse === groupName;

  const handleClickGroupCollapse = () => {
    setOpenedGroupCollapse(isOpen ? '' : groupName);
  };

  const handleClickDrug = (drugId: string) => {
    setDrug(drugId);
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
              selected={drug.id === selectedDrug}
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
