import React from 'react';
import { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { subDays, format } from 'date-fns';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('day');
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Dummy data for demonstration
  const data = [
    { date: format(subDays(new Date(), 6), 'MM/dd/yyyy'), revenue: 4000 },
    { date: format(subDays(new Date(), 5), 'MM/dd/yyyy'), revenue: 3000 },
    { date: format(subDays(new Date(), 4), 'MM/dd/yyyy'), revenue: 2000 },
    { date: format(subDays(new Date(), 3), 'MM/dd/yyyy'), revenue: 2780 },
    { date: format(subDays(new Date(), 2), 'MM/dd/yyyy'), revenue: 1890 },
    { date: format(subDays(new Date(), 1), 'MM/dd/yyyy'), revenue: 2390 },
    { date: format(new Date(), 'MM/dd/yyyy'), revenue: 3490 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Doanh thu của PetHome</h1>
        
        <div className="flex justify-end mb-4 space-x-2">
          <Button 
            variant={timeRange === 'day' ? 'contained' : 'outlined'} 
            color="primary" 
            onClick={() => handleTimeRangeChange('day')}
          >
            Daily
          </Button>
          <Button 
            variant={timeRange === 'week' ? 'contained' : 'outlined'} 
            color="primary" 
            onClick={() => handleTimeRangeChange('week')}
          >
            Weekly
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'contained' : 'outlined'} 
            color="primary" 
            onClick={() => handleTimeRangeChange('month')}
          >
            Monthly
          </Button>
        </div>

        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Thống kê doanh thu
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
