import { Input, Pagination, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import '@/assets/scss/pages/books.scss';

const { Search } = Input;

const Books: React.FC = () => {
  const booksData = [
    {
      id: 1,
      name: 'Sách 1',
      category: 'Thể loại 1',
      author: 'Tác giả 1',
      status: true,
    },
    {
      id: 2,
      name: 'Sách 2',
      category: 'Thể loại 2',
      author: 'Tác giả 2',
      status: false,
    },
    {
      id: 3,
      name: 'Sách 3',
      category: 'Thể loại 1',
      author: 'Tác giả 1',
      status: true,
    },
    {
      id: 4,
      name: 'Sách 4',
      category: 'Thể loại 2',
      author: 'Tác giả 1',
      status: true,
    },
    {
      id: 5,
      name: 'Sách 5',
      category: 'Thể loại 1',
      author: 'Tác giả 3',
      status: false,
    },
    {
      id: 6,
      name: 'Sách 6',
      category: 'Thể loại 4',
      author: 'Tác giả 1',
      status: false,
    },
  ];

  const columns = [
    {
      title: 'ID',
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
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (status ? 'Có sẵn' : 'Đã mượn'),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const onSearch = (value: string) => {
    setSearchKeyword(value.trim());
    setCurrentPage(1); // Reset current page to 1 when performing a new search
  };

  // Configure pagination
  const pageSize = 5;
  const totalBooks = booksData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the booksData based on the search keyword
  const filteredData = searchKeyword
    ? booksData.filter(
        book =>
          book.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          book.category.toLowerCase().includes(searchKeyword.toLowerCase()),
      )
    : booksData;

  // Slice the data source to display only the books for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="books">
      <div className="books__search">
        <Typography.Title level={2}>Tìm kiếm sách</Typography.Title>
        <Search placeholder="Nhập vào tên sách" allowClear enterButton="Search" size="large" onSearch={onSearch} />
      </div>
      <div className="books__list">
        <Typography.Title level={2}>Danh sách sách</Typography.Title>
        <Table dataSource={currentPageData} columns={columns} bordered={true} pagination={false} />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </div>
    </div>
  );
};

export default Books;
