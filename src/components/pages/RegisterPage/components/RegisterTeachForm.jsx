import { Button, Form, Input, InputNumber, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export const RegisterTeachForm = (props) => {
  const {
    handleSubmit,
    formData,
    handleChange,
    loadingRegister,
    handleFileChange,
  } = props;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const onFinish = (values) => {
    handleSubmit(values);
  };
  return (
    <div className="row justify-content-center">
      <Form
        onFinish={onFinish}
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
      >
        <Form.Item label="Full Name: " name="fullName">
          <Input required />
        </Form.Item>
        <Form.Item label="Email: " name="email">
          <Input required />
        </Form.Item>
        <Form.Item label="Phone: " name="phoneNumber">
          <Input required />
        </Form.Item>
        <Form.Item label="Subject of Expertise: " name="expertise">
          <Input required />
        </Form.Item>
        <Form.Item label="Years of Experience: " name="yearsOfExperience">
          <InputNumber required />
        </Form.Item>
        <Form.Item label="Tell us more about yourself: " name="bio">
          <TextArea cols={10} />
        </Form.Item>
        <Form.Item label="Facebook Link: " name="facebookLink">
          <Input required type="url"></Input>
        </Form.Item>
        <Form.Item label="Upload CV (PDF only): " name="cv">
          <input
            type="file"
            className="form-control custom-form-control-file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </Form.Item>
        <Form.Item label="Upload Certificate (PDF only): " name="certificate">
          <input
            type="file"
            className="form-control custom-form-control-file"
            id="certificate"
            name="certificate"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </Form.Item>
        <Form.Item className="text-center">
          {loadingRegister ? (
            <Button type="primary" htmlType="submit" loading>
              Uploading
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Register as Teacher
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
