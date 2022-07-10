import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";


import {
  collection,
  query,
  onSnapshot,

} from "firebase/firestore";
import { db } from "../../firebase";


const FoodList = () => {
  const [foodData, setFoodData] = useState([]);


  useEffect(() => {
    const foodListingsRef = collection(db, "foodListings");
    const q = query(foodListingsRef);
    onSnapshot(q, (querySnapshot) => {
      let foodData = [];
      querySnapshot.forEach((doc) => {
        let store = doc.data();
        Object.assign(store, { id: doc.id });
        foodData.push(store);
      });
      setFoodData(foodData);
    });
  }, []);

  return foodData.map((item) => <FoodItem item={item} />);
};

export default FoodList;
