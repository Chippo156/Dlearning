import React from "react";
import { Modal, Carousel, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const PromoModal = ({ onClose, ads }) => {
  const carouselRef = React.useRef(null);

  return (
    <Modal open={true} onCancel={onClose} footer={null} width={500} centered>
      <div className="position-relative">
        <Button
          className="position-absolute top-50 start-0 translate-middle-y"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current.prev()}
        />
        <Carousel autoplay dotPosition="bottom" ref={carouselRef}>
          {ads.map((ad) => (
            <div key={ad.id} className="p-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="d-flex flex-column align-items-center"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
                <h3 className="mt-3">{ad.title}</h3>
                <p className="text-muted">{ad.description}</p>
                <p className="fw-bold text-danger">${ad.price.toFixed(2)}</p>
                <p>
                  <strong>Start:</strong> {ad.startDate} | <strong>End:</strong>{" "}
                  {ad.endDate}
                </p>
                <Button type="primary" href={ad.link} target="_blank">
                  Enroll Now
                </Button>
              </motion.div>
            </div>
          ))}
        </Carousel>
        <Button
          className="position-absolute top-50 end-0 translate-middle-y"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
        />
      </div>
    </Modal>
  );
};
