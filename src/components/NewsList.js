import React from "react";
import { useSelector } from "react-redux";
import CreateNews from "./CreateNews";
import NewsItem from "./NewsItem";
import SearchPanel from "./SearchPanel";

const NewsList = (props) => {
   const isAuth = useSelector((state) => state.auth.token);
   const isAdmin = useSelector((state) => state.auth.isAdmin);

   const renderItems = (arr) => {
      return arr.map((item) => {
         if (item.show || isAdmin || isAuth) {
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

   const content = renderItems(props.newsList);
   return (
      <>
         <SearchPanel onSearchChange={props.onSearchChange} />
         {content}
         {isAuth ? <CreateNews addItem={props.addItem} /> : null}
      </>
   );
};

export default NewsList;
