import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pagination, Table, Typography } from 'antd';
import '@/assets/scss/pages/home.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Visitors',
        backgroundColor: 'rgb(75, 192, 192)',
        data: [65, 59, 80, 81],
        stack: 'Stack 0',
      },
      {
        label: 'Borrowers',
        backgroundColor: 'rgb(53, 162, 235)',
        data: [28, 48, 40, 19],
        stack: 'Stack 1',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Number of Visitors and Borrowers per Week',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const dataSource = [
    {
      key: '1',
      bookTitle: 'Book 1',
      borrower: 'John Doe',
      returnDate: '2023-06-01',
      overdue: '1 day',
    },
    {
      key: '2',
      bookTitle: 'Book 2',
      borrower: 'Jane Smith',
      returnDate: '2023-06-05',
      overdue: '5 days',
    },
    {
      key: '3',
      bookTitle: 'Book 3',
      borrower: 'John Doe',
      returnDate: '2023-06-01',
      overdue: '1 day',
    },
    {
      key: '4',
      bookTitle: 'Book 4',
      borrower: 'John Doe',
      returnDate: '2023-06-01',
      overdue: '1 day',
    },
    {
      key: '5',
      bookTitle: 'Book 5',
      borrower: 'John Doe',
      returnDate: '2023-06-01',
      overdue: '1 day',
    },
    {
      key: '6',
      bookTitle: 'Book 6',
      borrower: 'John Doe',
      returnDate: '2023-06-01',
      overdue: '1 day',
    },
  ];

  // Define the columns of the table
  const columns = [
    {
      title: 'Book Title',
      dataIndex: 'bookTitle',
      key: 'bookTitle',
    },
    {
      title: 'Borrower',
      dataIndex: 'borrower',
      key: 'borrower',
    },
    {
      title: 'Overdue',
      dataIndex: 'overdue',
      key: 'overdue',
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  // Configure pagination
  const pageSize = 5;
  const totalBooks = dataSource.length;
  const totalPages = Math.ceil(totalBooks / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data source to display only the books for the current page
  const currentPageData = dataSource.slice(startIndex, endIndex);

  return (
    <div>
      <Bar data={data} options={options} />
      <div className="overdue-book-loan">
        <Typography.Title level={2}>Overdue Books Loan</Typography.Title>
        <Table dataSource={currentPageData} columns={columns} pagination={false} />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalBooks}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </div>
    </div>
  );
};

export default Home;
