export type Drug = {
  id: string;
  label: string;
  note: string;
  group: string;
};

export type DrugMap = {
  [id: string]: Drug;
};

export type DrugGroups = {
  [group: string]: Drug[];
};
