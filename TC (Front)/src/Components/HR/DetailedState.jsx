import { Box, Typography } from '@mui/material';
import { BarChart, LineChart } from '@mui/x-charts';

const ResponsiveCharts = () => {
  const employeeData = [
    { day: 'SUN', absence: 3, presence: 5 },
    { day: 'MON', absence: 2, presence: 6 },
    { day: 'TUE', absence: 4, presence: 4 },
    { day: 'WED', absence: 1, presence: 7 },
    { day: 'THU', absence: 5, presence: 3 },
    { day: 'FRI', absence: 2, presence: 6 },
    { day: 'SAT', absence: 3, presence: 5 },
  ];

  const globalData = [
    { month: 'JAN', presence: 20, absence: 5 },
    { month: 'FEB', presence: 18, absence: 7 },
    { month: 'MAR', presence: 22, absence: 3 },
    { month: 'APR', presence: 25, absence: 1 },
    { month: 'MAY', presence: 27, absence: 4 },
    { month: 'JUN', presence: 30, absence: 2 },
    { month: 'JUL', presence: 32, absence: 5 },
    { month: 'AUG', presence: 29, absence: 6 },
    { month: 'SEP', presence: 27, absence: 8 },
    { month: 'OCT', presence: 25, absence: 3 },
    { month: 'NOV', presence: 28, absence: 2 },
    { month: 'DEC', presence: 30, absence: 4 },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      {/* Employee's Statistics */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Employees Statistics</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 4 }}>
        <Box sx={{ flex: '1 1 45%', margin: 1, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Absence/Late Graph</Typography>
          <BarChart
            data={employeeData}
            xAxis={{ id: 'day', data: employeeData.map(d => d.day) }}
            series={[
              { data: employeeData.map(d => d.absence), label: 'Absence', color: 'purple' },
              { data: employeeData.map(d => d.presence), label: 'Presence', color: 'orange' },
            ]}
            width="100%"
            height={300}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', margin: 1, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Predicted Absence/Late Graph</Typography>
          <BarChart
            data={employeeData}
            xAxis={{ id: 'day', data: employeeData.map(d => d.day) }}
            series={[
              { data: employeeData.map(d => d.absence + 1), label: 'Predicted Absence', color: 'blue' },
              { data: employeeData.map(d => d.presence + 1), label: 'Predicted Presence', color: 'green' },
            ]}
            width="100%"
            height={300}
          />
        </Box>
      </Box>

      {/* Global Statistics */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Global Statistics</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 45%', margin: 1, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Employees Behavior Global Statistics</Typography>
          <LineChart
            data={globalData}
            xAxis={{ id: 'month', data: globalData.map(d => d.month) }}
            series={[
              { data: globalData.map(d => d.presence), label: 'Presence', color: 'orange' },
              { data: globalData.map(d => d.absence), label: 'Absence', color: 'purple' },
            ]}
            width="100%"
            height={300}
          />
        </Box>

        <Box sx={{ flex: '1 1 45%', margin: 1, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Employees Behavior Global Statistics Prediction</Typography>
          <LineChart
            data={globalData}
            xAxis={{ id: 'month', data: globalData.map(d => d.month) }}
            series={[
              { data: globalData.map(d => d.presence + 5), label: 'Predicted Presence', color: 'green' },
              { data: globalData.map(d => d.absence + 5), label: 'Predicted Absence', color: 'blue' },
            ]}
            width="100%"
            height={300}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ResponsiveCharts;