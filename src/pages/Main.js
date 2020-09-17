import React from "react";
import { connect } from "react-redux";

const Main = ({ isAuth }) => {
   const email = isAuth ? localStorage.getItem("email") : "Гость";

   return (
      <div className="page">
         <h1>Главная</h1>
         <p>Привет, {email} !</p>
      </div>
   );
};

function mapStateToProps(state) {
   return {
      isAuth: !!state.auth.token,
   };
}

export default connect(mapStateToProps)(Main);
