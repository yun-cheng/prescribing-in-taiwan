'use client';

import { drugGroupsAtom } from '@/atoms/sideBar';
import { List } from '@mui/material';
import { useAtom } from 'jotai';
import GroupCollapseList from './GroupCollapseList';

export default function DrugList() {
  const [drugGroups] = useAtom(drugGroupsAtom);

  if (!drugGroups) {
    return <div />;
  }

  return (
    <List component="div" disablePadding>
      {Object.keys(drugGroups).map((group, index) => (
        <GroupCollapseList
          key={group}
          groupName={group}
          groupData={drugGroups[group]}
          index={index}
        />
      ))}
    </List>
  );
}
