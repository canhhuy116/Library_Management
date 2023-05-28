import { Input, Space, Typography } from 'antd';
import React from 'react';
import '@/assets/scss/pages/books.scss';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const Books: React.FC = () => (
  <div className="books">
    <Typography.Title level={2}>Tìm kiếm sách</Typography.Title>
    <Search
      placeholder="Nhập vào tên sách"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
      className="books__search"
    />
  </div>
);

export default Books;
