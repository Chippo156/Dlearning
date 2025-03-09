import { Image, Space, Table, Tag } from "antd";

export const AdsTable = ({
  ads,
  totalPages,
  totalElements,
  setCurrentPage,
  currentPage,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image width={100} src={text} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "contactEmail",
      dataIndex: "contactEmail",
      key: "contactEmail",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "contactPhone",
      dataIndex: "contactPhone",
      key: "contactPhone",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "adsStatus",
      dataIndex: "adsStatus",
      render: (adsStatus) => (
        <Tag color={adsStatus === "ACTIVE" ? "green" : "volcano"}>
          {adsStatus}
        </Tag>
      ),
    },
  ];
  return (
    <div className="m-3">
      <Table
        columns={columns}
        dataSource={ads}
        rowKey={(record, index) => record.id || index}
        pagination={{
          current: currentPage, // Trang hiện tại
          pageSize: Math.ceil(totalElements / totalPages), // Số mục mỗi trang
          total: totalElements, // Tổng số phần tử
          showSizeChanger: false, // Ẩn chọn số mục mỗi trang
          onChange: (page) => setCurrentPage(page), // Cập nhật trang khi thay đổi
          showTotal: (total, range) =>
            `Total ${total} items | Page ${currentPage} of ${totalPages}`, // Hiển thị số trang
        }}
      />
    </div>
  );
};
