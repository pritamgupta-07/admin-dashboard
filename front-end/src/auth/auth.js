import { useState, useCallback, useEffect } from "react";

const useAuthCredentials = () => {
  const [userAuth, setUserAuth] = useState({});

  const user = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));

    const userAuth = {
      id: user._id,
      access: user.access,
      email: user.email,
      name: user.name,
      age: user.age,
      token,
    };
    setUserAuth(userAuth);
  }, []);

  useEffect(() => {
    user();
  }, [user]);

  return userAuth;
};

export default useAuthCredentials;
