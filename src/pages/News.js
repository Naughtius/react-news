import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NewsList from "../components/NewsList";

const News = () => {
   const [news, setNews] = useState([]);
   const [term, setTerm] = useState("");
   const [loading, setLoading] = useState(true);

   const search = (items, term) => {
      if (term.length === 0) {
         return items;
      }

      return items.filter((item) => {
         return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
      });
   };

   useEffect(() => {
      const fetchData = async () => {
         const response = await axios.get(
            "https://react-news-cdea5.firebaseio.com/newslist.json"
         );

         if (!response.data) {
            setLoading(false);
            return;
         }

         const keyArr = [];
         const promisesArr = Object.keys(response.data).map((key) => {
            keyArr.push({ key });
            return axios.get(
               `https://react-news-cdea5.firebaseio.com/newslist/${key}.json`
            );
         });

         const values = await Promise.all(promisesArr);
         const newArr = values.map((item) => item.data);
         newArr.forEach((v, i) => (v.key = keyArr[i].key));
         setLoading(false);
         setNews(newArr);
      };
      fetchData();
   }, []);

   const removeItem = async (id, key) => {
      const newArr = [...news];
      const result = newArr.filter((item) => item.id !== id);
      await axios.delete(
         `https://react-news-cdea5.firebaseio.com/newslist/${key}.json`
      );
      setNews(result);
   };

   const addItem = async (title, text, date) => {
      const newItem = { title, text, date, id: news.length + 1, show: false };
      const oldArray = [...news];
      oldArray.push(newItem);
      await axios.post(
         "https://react-news-cdea5.firebaseio.com/newslist.json",
         newItem
      );
      setNews(oldArray);
   };

   const onSearchChange = (term) => {
      setTerm(term);
   };

   const successNewsItem = (id, key) => {
      const newArr = [...news];
      newArr.forEach(async (item) => {
         if (item.id === id) {
            item.show = !item.show;
            await axios.patch(
               `https://react-news-cdea5.firebaseio.com/newslist/${key}.json`,
               { show: item.show }
            );
         }
      });
      setNews(newArr);
   };

   const visibleItems = search(news, term);

   return (
      <div className="page">
         <h1>Новости</h1>
         {loading ? (
            <Loader />
         ) : (
            <NewsList
               removeItem={removeItem}
               newsList={visibleItems}
               onSearchChange={onSearchChange}
               addItem={addItem}
               successNewsItem={successNewsItem}
            />
         )}
      </div>
   );
};

export default News;
