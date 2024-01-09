export type ChartSetDataType = {
  [year: string]: {
    [sex: string]: (number | null)[];
  };
};

export type FullChartSetDataType = {
  [drugId: string]: ChartSetDataType;
};
