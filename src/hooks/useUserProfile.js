import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getAvatar, getPoints } from "../service/UserSevice";

export const useUserProfile = () => {
  const authContext = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authContext.authenticated) {
      setAvatar(null);
      setPoints(0);
      setLoading(false);
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const avatarData = await getAvatar();
        setAvatar(avatarData.data);
        const pointsData = await getPoints();
        setPoints(pointsData.data.points);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [authContext]);
  return { avatar, points, loading };
};
