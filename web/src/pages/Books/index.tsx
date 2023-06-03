import { Button, Card, DatePicker, Form, Input, Modal, Pagination, Popconfirm, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import '@/assets/scss/pages/books.scss';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Search } = Input;

export interface IBook {
  id: number;
  name: string;
  category: string;
  author: string;
  status: boolean;
  publicCationYear: number;
  publisher: string;
  importDate: dayjs.Dayjs;
}

const booksDataInit: IBook[] = [
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
  {
    id: 3,
    name: 'Sách 3',
    category: 'Thể loại 1',
    author: 'Tác giả 1',
    status: true,
    publicCationYear: 2021,
    publisher: 'Nhà xuất bản 3',
    importDate: dayjs('2021-08-01'),
  },
  {
    id: 4,
    name: 'Sách 4',
    category: 'Thể loại 2',
    author: 'Tác giả 1',
    status: true,
    publicCationYear: 2021,
    publisher: 'Nhà xuất bản 4',
    importDate: dayjs('2021-08-01'),
  },
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
];

const Books: React.FC = () => {
  const [booksData, setBooksData] = useState<IBook[]>(booksDataInit); // booksDataInit is defined below
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newBookForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null); // The book object that is being viewed or edited

  const columns = [
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
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (status ? 'Có sẵn' : 'Đã mượn'),
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (id: number) => {
        const record = booksData.find(book => book.id === id); // Find the corresponding book object
        return record ? (
          <Space size="small">
            <Button type="link" onClick={() => viewBookDetails(record)}>
              View
            </Button>
            <Popconfirm
              title="Are you sure to delete this book?"
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

  const showModal = () => {
    newBookForm.resetFields();
    setSelectedBook(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value: string) => {
    setSearchKeyword(value.trim());
    setCurrentPage(1); // Reset current page to 1 when performing a new search
  };

  const handleDelete = (id: number) => {
    const updatedBooksData = booksData.filter(book => book.id !== id);
    setBooksData(updatedBooksData);
  };

  const handleAddBook = () => {
    newBookForm.validateFields().then(values => {
      const newBook = {
        id: selectedBook ? selectedBook.id : booksData.length + 1,
        name: values.name,
        category: values.category,
        author: values.author,
        status: selectedBook ? selectedBook.status : true,
        publicCationYear: values.publicationYear?.year(),
        publisher: values.publisher,
        importDate: values.importDate?.toDate(),
      };
      let updatedBooksData;
      if (selectedBook) {
        // Update existing book
        updatedBooksData = booksData.map(book => {
          if (book.id === selectedBook.id) {
            return { ...book, ...newBook };
          }
          return book;
        });
      } else {
        // Add new book
        updatedBooksData = [...booksData, newBook];
      }
      setBooksData(updatedBooksData);
      newBookForm.resetFields();
      setIsModalVisible(false);
    });
  };

  const viewBookDetails = (book: IBook) => {
    setIsModalVisible(true);
    setSelectedBook(book);

    // Set the form values
    newBookForm.setFieldsValue({
      name: book.name,
      category: book.category,
      author: book.author,
      publicationYear: book.publicCationYear ? dayjs(`${book.publicCationYear}`) : null,
      publisher: book.publisher,
      importDate: book.importDate ? dayjs(book.importDate) : null,
    });
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
      <Card
        className="books__list"
        title={
          <Space className="books__list__title">
            <Typography.Title level={3}>Danh sách sách</Typography.Title>
            <Typography.Title level={3}>Tổng số: {totalBooks}</Typography.Title>
            <Typography.Title level={3}>Hiển thị: {currentPageData.length}</Typography.Title>
            <Button
              type="primary"
              size="large"
              icon={<PlusCircleOutlined />}
              className="book__list_titleBtn"
              onClick={showModal}
            />
          </Space>
        }
      >
        <Modal
          title={selectedBook ? 'Chi tiết sách' : 'Thêm sách'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            selectedBook ? (
              <Button key="edit" type="primary" onClick={handleAddBook}>
                Câp nhật
              </Button>
            ) : (
              <Button key="add" type="primary" onClick={handleAddBook}>
                Thêm
              </Button>
            ),
          ]}
        >
          <Form form={newBookForm} layout="vertical">
            <Form.Item name="name" label="Tên sách" rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}>
              <Input placeholder="Tên sách" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Thể loại"
              rules={[{ required: true, message: 'Vui lòng nhập thể loại sách' }]}
            >
              <Input placeholder="Thể loại" />
            </Form.Item>
            <Form.Item
              name="author"
              label="Tác giả"
              rules={[{ required: true, message: 'Vui lòng nhập tác giả sách' }]}
            >
              <Input placeholder="Tác giả" />
            </Form.Item>
            <Form.Item
              name="publicationYear"
              label="Năm xuất bản"
              rules={[{ required: true, message: 'Vui lòng chọn năm xuất bản' }]}
            >
              <DatePicker picker="year" placeholder="Năm xuất bản" />
            </Form.Item>
            <Form.Item
              name="publisher"
              label="Nhà xuất bản"
              rules={[{ required: true, message: 'Vui lòng nhập nhà xuất bản' }]}
            >
              <Input placeholder="Tác giả" />
            </Form.Item>
            <Form.Item
              name="importDate"
              label="Ngày nhập sách"
              rules={[{ required: true, message: 'Vui lòng chọn ngày nhập sách' }]}
            >
              <DatePicker placeholder="Ngày nhập sách" />
            </Form.Item>
          </Form>
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
          total={filteredData.length}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </Card>
    </div>
  );
};

export default Books;
