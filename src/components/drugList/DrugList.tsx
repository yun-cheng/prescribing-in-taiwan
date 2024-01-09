'use client';

import { DrugData } from '@/types/drug';
import { List } from '@mui/material';
import GroupCollapseList from './GroupCollapseList';

type Props = {
  drugData: DrugData;
};

export default function DrugList({ drugData }: Props) {
  return (
    <List component="div" disablePadding>
      {Object.keys(drugData).map((group) => (
        <GroupCollapseList
          key={group}
          groupName={group}
          groupData={drugData[group]}
        />
      ))}
    </List>
  );
}
