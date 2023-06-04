import { DeleteOutlined, FundViewOutlined } from '@ant-design/icons';
import { Card, Space, Typography, Button, Modal, Table, Pagination, Popconfirm } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import '@/assets/scss/pages/loanSlips.scss';
import { IBook } from '@/store/bookStore';

interface ILoanSlips {
  id: number;
  borrower: string;
  borrowerId: number;
  books: IBook[];
  borrowDate: dayjs.Dayjs;
}

const loanSlipsDataInit: ILoanSlips[] = [
  {
    id: 1,
    borrower: 'Nguyễn Văn A',
    borrowerId: 1,
    books: [
      {
        id: 1,
        name: 'Sách 1',
        category: 'Thể loại 1',
        author: 'Tác giả 1',
        status: true,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 1',
        importDate: dayjs('2021-08-01'),
      },
      {
        id: 2,
        name: 'Sách 2',
        category: 'Thể loại 2',
        author: 'Tác giả 2',
        status: false,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 2',
        importDate: dayjs('2021-08-01'),
      },
    ],
    borrowDate: dayjs('2021-08-01'),
  },
  {
    id: 2,
    borrower: 'Nguyễn Văn B',
    borrowerId: 2,
    books: [
      {
        id: 1,
        name: 'Sách 1',
        category: 'Thể loại 1',
        author: 'Tác giả 1',
        status: true,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 1',
        importDate: dayjs('2021-08-01'),
      },
    ],
    borrowDate: dayjs('2021-08-01'),
  },
  {
    id: 3,
    borrower: 'Nguyễn Văn C',
    borrowerId: 3,
    books: [
      {
        id: 2,
        name: 'Sách 2',
        category: 'Thể loại 2',
        author: 'Tác giả 2',
        status: false,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 2',
        importDate: dayjs('2021-08-01'),
      },
    ],
    borrowDate: dayjs('2021-08-01'),
  },
  {
    id: 4,
    borrower: 'Nguyễn Văn D',
    borrowerId: 4,
    books: [
      {
        id: 5,
        name: 'Sách 5',
        category: 'Thể loại 1',
        author: 'Tác giả 3',
        status: false,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 5',
        importDate: dayjs('2021-09-01'),
      },
      {
        id: 6,
        name: 'Sách 6',
        category: 'Thể loại 4',
        author: 'Tác giả 1',
        status: false,
        publicCationYear: 2021,
        publisher: 'Nhà xuất bản 6',
        importDate: dayjs('2021-09-01'),
      },
    ],
    borrowDate: dayjs('2021-08-01'),
  },
];

const LoanSlips = () => {
  const [loanSlipsData, setLoanSlipsData] = useState<ILoanSlips[]>(loanSlipsDataInit); // booksDataInit is defined below
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLoanSlips, setSelectedLoanSlips] = useState<ILoanSlips | null>(null);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên người mượn',
      dataIndex: 'borrower',
      key: 'borrower',
    },
    {
      title: 'Số sách mượn',
      dataIndex: 'books',
      key: 'books',
      render: (books: IBook[]) => books.length,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (id: number) => {
        const record = loanSlipsData.find(loanSlip => loanSlip.id === id);
        return record ? (
          <Space size="small">
            <Button type="link" onClick={() => viewLoanSlipDetail(record)}>
              <FundViewOutlined />
            </Button>
            <Popconfirm
              title="Are you sure to delete this loan slip?"
              onConfirm={() => handleDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ) : null;
      },
    },
  ];

  const viewLoanSlipDetail = (loanSlip: ILoanSlips) => {
    setSelectedLoanSlips(loanSlip);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const newLoanSlipsData = loanSlipsData.filter(loanSlip => loanSlip.id !== id);
    setLoanSlipsData(newLoanSlipsData);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Configure pagination
  const pageSize = 5;
  const totalBooks = loanSlipsData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the data source to display only the books for the current page
  const currentPageData = loanSlipsData.slice(startIndex, endIndex);

  return (
    <Card
      className="loanSlips"
      title={
        <Space className="loanSlips__title">
          <Typography.Title level={3}>Danh sách phiếu mượn</Typography.Title>
          <Typography.Title level={3}>Tổng số: {totalBooks}</Typography.Title>
          <Typography.Title level={3}>Hiển thị: {currentPageData.length}</Typography.Title>
        </Space>
      }
    >
      <Modal open={isModalVisible} onCancel={handleCancel} onOk={handleCancel}>
        <Typography.Title level={2}>Phiếu mượn sách</Typography.Title>
        <Typography.Title level={3}>Tên đọc giả: {selectedLoanSlips?.borrower}</Typography.Title>
        <Typography.Title level={3}>Ngày mượn: {selectedLoanSlips?.borrowDate.format('DD/MM/YYYY')}</Typography.Title>
        <Table
          dataSource={selectedLoanSlips?.books}
          columns={[
            {
              title: 'STT',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Tên sách',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Thể loại',
              dataIndex: 'category',
              key: 'category',
            },
            {
              title: 'Tác giả',
              dataIndex: 'author',
              key: 'author',
            },
          ]}
          bordered={true}
          pagination={false}
          rowKey={record => record.id}
        />
      </Modal>
      <Table
        dataSource={currentPageData}
        columns={columns}
        bordered={true}
        pagination={false}
        rowKey={record => record.id}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={loanSlipsData.length}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </Card>
  );
};

export default LoanSlips;
