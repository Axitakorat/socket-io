import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  const checkUser = () => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (!user || user === "undefined") {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUser();
  }, []);
  return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};
export default Protected;
