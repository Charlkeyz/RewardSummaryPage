import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy data for demonstration
const dummyData = {
    totalCashback: 250.75,
    currentBalance: 150.50,
    cashbackHistory: [
      { id: 1, date: '2024-09-01', bookingAmount: 1700.00, bookingDetails: 'Hotel Booking #12345' },
      { id: 2, date: '2024-08-15', bookingAmount: 1050.00, bookingDetails: 'Flight Booking #67890' },
      { id: 3, date: '2024-07-30', bookingAmount: 2000.00, bookingDetails: 'Car Rental #24680' },
    ],
  };

const RewardsSummary = () => {
  const [data, setData] = useState(dummyData);
  const [cashoutAmount, setCashoutAmount] = useState('');

 
  const handleCashout = () => {
    setCashoutAmount('');
  };

  const handlePromoCodeGeneration = () => {
    
  };
  useEffect(() => {
    const updatedCashbackHistory = dummyData.cashbackHistory.map((transaction) => {
      const cashback = (transaction.bookingAmount * 1.5) / 100;
      return { ...transaction, amount: cashback };  
    });
  
    setData((prevData) => ({
      ...prevData,
      cashbackHistory: updatedCashbackHistory,
      totalCashback: updatedCashbackHistory.reduce((sum, t) => sum + t.amount, 0),  
      currentBalance: updatedCashbackHistory.reduce((sum, t) => sum + t.amount, 0), 
    }));
  }, []);
  

  // Data for Chart.js Bar Chart
  const chartData = {
    labels: data.cashbackHistory.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Cashback Amount',
        data: data.cashbackHistory.map(transaction => transaction.amount),
        backgroundColor: '#8884d8',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Cashback Trend' },
    },
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rewards Summary</h1>
      
      {/* Flexbox for Total Cashback and Current Balance */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Card className="flex-1">
          <CardBody>
            <h2 className="text-xl font-semibold mb-2">Total Cashback Earned</h2>
            <p className="text-4xl font-bold">${data.totalCashback.toFixed(2)}</p>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardBody>
            <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
            <p className="text-4xl font-bold">${data.currentBalance.toFixed(2)}</p>
          </CardBody>
        </Card>
      </div>

      {/* Cashback History Table */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Cashback History</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Cashback history table">
            <TableHeader>
              <TableColumn>DATE</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>BOOKING DETAILS</TableColumn>
            </TableHeader>
            <TableBody>
              {data.cashbackHistory.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.bookingDetails}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Cashback Trend Bar Chart */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Cashback Trend</h2>
        </CardHeader>
        <CardBody>
          <div style={{ width: '100%', height: '300px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>

      {/* Cashout Options */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Cashout Options</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Direct Cashout */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Direct Cashout</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={cashoutAmount}
                  onChange={(e) => setCashoutAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-grow"
                />
                <Button color="primary" onClick={handleCashout}>Cash Out</Button>
              </div>
            </div>

            {/* Generate Promo Code */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Generate Promo Code</h3>
              <Button color="secondary" onClick={handlePromoCodeGeneration}>Generate Promo Code</Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RewardsSummary;
