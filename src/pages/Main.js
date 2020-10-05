import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
   const isAuth = useSelector((state) => state.auth.token);
   const email = isAuth ? localStorage.getItem("email") : "Гость";

   return (
      <div className="page">
         <h1>Главная</h1>
         <p>Привет, {email} !</p>
      </div>
   );
};

export default Main;
