import { useEffect, useState } from "react";
import { FormUpdateProfile } from "./components/FormUpdateProfile";
import { address, g } from "framer-motion/client";
import {
  getInforProfile,
  updateProfile,
} from "../../../service/ProfileService";
import { toast } from "react-toastify";

export const ProfilePage = () => {
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
  const [handleEdit, setHandleEdit] = useState(false);
  useEffect(() => {
    document.title = "Frofile";
  });

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

  return (
    <div className="content-profile">
      <FormUpdateProfile
        handleEditData={handleEditData}
        handleEdit={handleEdit}
        profileData={profileData}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};
