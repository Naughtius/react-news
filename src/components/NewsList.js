import React from "react";
import { connect } from "react-redux";
import CreateNews from "./CreateNews";
import NewsItem from "./NewsItem";
import SearchPanel from "./SearchPanel";

const NewsList = (props) => {
   const renderItems = (arr) => {
      return arr.map((item) => {
         if (item.show || props.isAdmin || props.isAuth) {
            return (
               <NewsItem
                  key={item.id}
                  title={item.title}
                  text={item.text}
                  removeItem={() => props.removeItem(item.id, item.key)}
                  date={item.date}
                  successNewsItem={() =>
                     props.successNewsItem(item.id, item.key)
                  }
                  show={item.show}
               />
            );
         } else {
            return null;
         }
      });
   };

   return (
      <>
         <SearchPanel onSearchChange={props.onSearchChange} />
         {renderItems(props.newsList)}
         {props.isAuth ? <CreateNews addItem={props.addItem} /> : null}
      </>
   );
};

function mapStateToProps(state) {
   return {
      isAdmin: state.auth.isAdmin,
      isAuth: !!state.auth.token,
   };
}

export default connect(mapStateToProps)(NewsList);
