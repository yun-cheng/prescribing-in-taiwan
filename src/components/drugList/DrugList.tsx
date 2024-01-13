'use client';

import { DrugGroups } from '@/types/drug';
import { List } from '@mui/material';
import GroupCollapseList from './GroupCollapseList';

type Props = {
  drugGroups: DrugGroups;
};

export default function DrugList({ drugGroups }: Props) {
  return (
    <List component="div" disablePadding>
      {Object.keys(drugGroups).map((group) => (
        <GroupCollapseList
          key={group}
          groupName={group}
          groupData={drugGroups[group]}
        />
      ))}
    </List>
  );
}
