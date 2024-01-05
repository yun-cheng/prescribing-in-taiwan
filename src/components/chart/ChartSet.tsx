import Chart from '@/components/chart/Chart';
import getInitChartSetData from '@/utils/getInitChartSetData';
import { Grid } from '@mui/material';

export default async function ChartSet() {
  const chartSetData = await getInitChartSetData();

  return (
    <div className="mx-auto max-w-screen-lg">
      <Grid container spacing={3} mb={3}>
        {Object.keys(chartSetData).map((year) => (
          <Grid item key={year} xs={12} md={6}>
            <Chart
              title={`Year ${year}`}
              xTitle="Age"
              yTitle="%"
              xLabels={[
                '0',
                '10',
                '20',
                '30',
                '40',
                '50',
                '60',
                '70',
                '80',
                '90',
              ]}
              colorLabels={['male', 'female']}
              chartData={Object.values(chartSetData[year])}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
