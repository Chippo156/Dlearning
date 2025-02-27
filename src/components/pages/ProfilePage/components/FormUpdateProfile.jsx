import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Form, Input, InputNumber, Select } from "antd";
import Meta from "antd/es/card/Meta";

export const FormUpdateProfile = (props) => {
  const {
    profileData,
    selectedImage,
    handleOnChangeAvatar,
    handleUpdateAvatar,
    isUpdatingAvatar,
    isRemovingAvatar,
    handleRemoveAvatar,
    handleInputChange,
    handleEdit,
    handleEditData,
    handleUpdateProfile,
  } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" onClick={handleEditData} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={profileData.firstName + " " + profileData.lastName}
              description={profileData.description}
            />
          </Card>
        </div>
        <div className="mt-3 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
          <Form
            {...layout}
            disabled={handleEdit}
            {...layout}
            name="nest-messages"
            onFinish={handleUpdateProfile}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="First Name"
              name={["user", "firstName"]}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name={["user", "lastName"]}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={["user", "gender"]}
              label="Gender"
              rules={[{ type: "gender" }]}
            >
              <Select
                defaultValue="Male"
                style={{ width: 120 }}
                options={[
                  { value: "MALE", label: "Male" },
                  { value: "FEMALE", label: "Female" },
                  { value: "OTHER", label: "Other" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name={["user", "phoneNumber"]}
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["user", "dateOfBirth"]} label="Date of birth">
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="dob"
                  placeholder="Date Of Birth"
                />
              </div>
            </Form.Item>
            <Form.Item
              label="Address"
              name={["user", "address"]}
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name={["user", "description"]}
              rules={[{ required: false }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
