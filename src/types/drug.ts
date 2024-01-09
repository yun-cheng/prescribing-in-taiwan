export type DrugType = {
  id: string;
  label: string;
  note: string;
};

export type DrugData = {
  [group: string]: DrugType[];
};
