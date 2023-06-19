import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import '@/assets/scss/pages/members.scss';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { inject } from 'mobx-react';
import Stores from '@/store';
import MemberStore, { IMember } from '@/store/memberStore';

const { Search } = Input;

interface IMembersProps {
  memberStore?: MemberStore;
}

const Members: React.FC = ({ memberStore }: IMembersProps) => {
  const [membersData, setMembersData] = useState<IMember[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newMemberForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null); // The book object that is being viewed or edited
  const [membersLoading, setMembersLoading] = useState(true);

  const getAllBooks = async () => {
    try {
      await memberStore?.getAll();
    } catch (error) {
      console.log(error);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    setMembersData(memberStore?.memberData);
  }, [memberStore?.memberData]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên độc giả',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại độc giả',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Ngày lập thẻ',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'actions',
      render: (id: number) => {
        const record = membersData?.find(member => member.id === id); // Find the corresponding book object
        return record ? (
          <Space size="small">
            <Button type="link" onClick={() => viewMemberDetails(record)}>
              <EditOutlined />
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
    newMemberForm.resetFields();
    setSelectedMember(null);
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
    const updatedBooksData = membersData?.filter(book => book.id !== id);
    setMembersData(updatedBooksData);
  };

  const handleAddMember = () => {
    newMemberForm.validateFields().then(async values => {
      const newMember = {
        id: membersData?.length ? membersData.length + 1 : 1,
        name: values.name,
        type: values.type,
        birthday: values.birthday?.toDate(),
        address: values.address,
        email: values.email,
        createDate: values.createDate?.toDate(),
      };
      setMembersData(membersData ? [...membersData, newMember] : [newMember]);
      newMemberForm.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleUpdateMember = () => {
    if (!selectedMember) return;
    newMemberForm.validateFields().then(values => {
      const updatedBook = {
        id: selectedMember.id,
        name: values.name,
        type: values.type,
        birthday: values.birthday?.toDate(),
        address: values.address,
        email: values.email,
        createDate: selectedMember.createDate,
      };
      let updatedMembersData: IMember[] | undefined;
      if (membersData) {
        updatedMembersData = membersData.map(book => {
          if (book.id === updatedBook.id) {
            return updatedBook;
          }
          return book;
        });
        setMembersData(updatedMembersData);
      }
      newMemberForm.resetFields();
      setIsModalVisible(false);
    });
  };

  const viewMemberDetails = (member: IMember) => {
    setIsModalVisible(true);
    setSelectedMember(member);

    // Set the form values
    newMemberForm.setFieldsValue({
      name: member.name,
      type: member.type,
      birthday: member.birthday ? dayjs(member.birthday) : null,
      address: member.address,
      email: member.email,
      createDate: member.createDate ? dayjs(member.createDate) : null,
    });
  };

  // Configure pagination
  const pageSize = 5;
  const totalBooks = membersData?.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter the booksData based on the search keyword
  const filteredData = searchKeyword
    ? membersData?.filter(
        member =>
          member.name.toLowerCase().includes(searchKeyword.toLowerCase()) || member.id === Number(searchKeyword),
      )
    : membersData;

  // Slice the data source to display only the books for the current page
  const currentPageData = filteredData?.slice(startIndex, endIndex);

  return (
    <div className="members">
      <div className="members__search">
        <Typography.Title level={2}>Tìm kiếm độc giả</Typography.Title>
        <Search
          placeholder="Nhập vào tên tên hoặc mã độc giả"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Card
        className="members__list"
        loading={membersLoading}
        title={
          <Space className="members__list__title">
            <Typography.Title level={3}>Danh sách độc giả</Typography.Title>
            <Typography.Title level={3}>Tổng số: {totalBooks}</Typography.Title>
            <Typography.Title level={3}>Hiển thị: {currentPageData?.length}</Typography.Title>
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
          title={selectedMember ? 'Xem thông tin độc giả' : 'Lập thẻ độc giả'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            selectedMember ? (
              <Button key="edit" type="primary" onClick={handleUpdateMember}>
                Câp nhật
              </Button>
            ) : (
              <Button key="add" type="primary" onClick={handleAddMember}>
                Thêm
              </Button>
            ),
          ]}
        >
          <Form form={newMemberForm} layout="vertical">
            <Form.Item
              name="name"
              label="Tên độc giả"
              rules={[{ required: true, message: 'Vui lòng nhập tên độc giả' }]}
            >
              <Input placeholder="Tên độc giả" />
            </Form.Item>
            <Form.Item
              name="type"
              label="Loại độc giả"
              rules={[{ required: true, message: 'Vui lòng chọn loại độc giả' }]}
            >
              <Select
                options={[
                  { value: 'X', label: 'X' },
                  { value: 'Y', label: 'Y' },
                ]}
                allowClear
                placeholder="Loại độc giả"
              />
            </Form.Item>
            <Form.Item
              name="birthday"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
              <DatePicker placeholder="Ngày sinh" />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
              <Input placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="createDate"
              label="Ngày lập thẻ"
              rules={[{ required: true, message: 'Vui lòng chọn ngày lập thẻ' }]}
            >
              <DatePicker placeholder="Ngày lập thẻ" disabled={Boolean(selectedMember)} />
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
          total={filteredData?.length}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </Card>
    </div>
  );
};

export default inject(Stores.MemberStore)(Members);
