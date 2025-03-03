import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadFile = (props) => {
  const { handleUpdateAvatar } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      const preview = await getBase64(file.originFileObj);
      file.preview = preview;
      setPreviewImage(preview);
      setSelectedFile(file.originFileObj);
    }
    setFileList(fileList.slice(-1));
  };

  const beforeUpload = (file) => {
    setFileList([{ ...file, preview: URL.createObjectURL(file) }]);
    setSelectedFile(file);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    setPreviewImage("");
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    handleUpdateAvatar(selectedFile);
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none", fontSize: 18 }}
      type="button"
    >
      <PlusOutlined style={{ fontSize: 30 }} />
      <div style={{ marginTop: 8 }}>Chọn ảnh</div>
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
      }}
    >
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
      >
        {fileList.length === 0 ? uploadButton : null}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      {selectedFile && (
        <Button
          type="primary"
          icon={<UploadOutlined />}
          style={{ marginTop: 20, fontSize: 16, padding: "10px 20px" }}
          onClick={handleUpload}
        >
          Upload
        </Button>
      )}
    </div>
  );
};

export default UploadFile;
