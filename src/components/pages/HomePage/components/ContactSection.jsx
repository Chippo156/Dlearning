import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const ContactSection = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="col-lg-7 ">
      <div className="section-title position-relative mb-4">
        <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
          Need help?
        </h6>
        <h1 className="display-4">Send Us A Message</h1>
      </div>
      <div className="contact-form">
        <form>
          <div className="row my-3">
            <div className="col-6">
              <Input placeholder="Your name" />
            </div>
            <div className="col-6">
              <Input placeholder="Email" />
            </div>
          </div>
          <div className="my-3">
            <TextArea rows={5} placeholder="Subject" />
          </div>
          <div className="my-3">
            <TextArea rows={5} placeholder="Message" />
          </div>
          <button className="btn btn-primary py-3 px-5" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
