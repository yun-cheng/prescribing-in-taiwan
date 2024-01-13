export type Drug = {
  id: string;
  label: string;
  note: string;
};

export type DrugGroups = {
  [group: string]: Drug[];
};
