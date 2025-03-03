import { useEffect, useState } from "react";
import { FormUpdateProfile } from "./components/FormUpdateProfile";
import {
  changePassword,
  getInforProfile,
  updateProfile,
  uploadAvatar,
} from "../../../service/ProfileService";
import { toast, ToastContainer } from "react-toastify";
import { message, notification } from "antd";
import { getAvatar } from "../../../service/UserSevice";

export const ProfilePage = () => {
  const [modalUpload, setModalUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    description: "",
    courseLevel: "",
  });

  const [api, contextHolder] = notification.useNotification();
  const [handleEdit, setHandleEdit] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [isUpdateAvatar, setIsUpdateAvatar] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.title = "Profile"; // Cập nhật tiêu đề trang khi mount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInforProfile();
        if (response && response.code === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchAvatar = async () => {
    const response = await getAvatar();
    if (response && response.code === 200) {
      setImage(response.data);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const handleEditData = () => {
    setHandleEdit(!handleEdit);
  };

  const handleUpdateProfile = async (values) => {
    const data = {
      firstName: values.user.firstName,
      lastName: values.user.lastName,
      gender: values.user.gender,
      phoneNumber: values.user.phoneNumber,
      description: values.user.description,
      dateOfBirth: values.user.dateOfBirth,
      address: values.user.address,
    };
    const response = await updateProfile(data);
    if (response && response.code === 200) {
      toast.success(response.message);
    } else {
      console.error(response.message);
    }
  };

  const handleUpdatePassword = async (values) => {
    const data = {
      currentPassword: values.password.password,
      newPassword: values.password.newPassword,
      confirmPassword: values.password.confirmPassword,
    };
    const response = await changePassword(data);
    if (response && response.code === 200) {
      toast.success(response.message || "Cập nhật thành công!");
      setIsUpdatePassword(false);
    } else {
      toast.error(response.message || "Cập nhật thất bại!");
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      if (!data) {
        toast.error("Vui lòng chọn ảnh!");
        return;
      }
      const formData = new FormData();
      formData.append("avatar", data);
      const response = await uploadAvatar(formData);
      if (response && response.code === 200) {
        fetchAvatar();
        setModalUpload(false);
        toast.success("Cập nhật ảnh đại diện thành công!");

        // Gọi notification sau khi ảnh cập nhật thành công
        api.success({
          message: "Thành công!",
          description: "Ảnh đại diện đã được cập nhật.",
        });
      } else {
        toast.error(response.message || "Cập nhật ảnh đại diện thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật avatar:", error);
      toast.error("Cập nhật ảnh đại diện thất bại!");
    }
  };

  return (
    <div className="content-profile">
      {contextHolder}{" "}
      {/* Đặt contextHolder ở đây để đảm bảo notification hiển thị */}
      <FormUpdateProfile
        handleEditData={handleEditData}
        handleEdit={handleEdit}
        profileData={profileData}
        handleUpdateProfile={handleUpdateProfile}
        isUpdateAvatar={isUpdateAvatar}
        setIsUpdateAvatar={setIsUpdateAvatar}
        isUpdatePassword={isUpdatePassword}
        setIsUpdatePassword={setIsUpdatePassword}
        password={password}
        handleUpdatePassword={handleUpdatePassword}
        modalUpload={modalUpload}
        setModalUpload={setModalUpload}
        handleUpdateAvatar={handleUpdateAvatar}
        avatar={image}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
