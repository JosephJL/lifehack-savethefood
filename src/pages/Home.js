import React , {useState,useEffect} from "react";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import { FoodList } from "../components/FoodInfo/FoodList";
import NavBar from "../components/Navbar/NavBar";
import CreateFoodButton from "../components/CreateFood/CreateFoodButton";

import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, query, where, Query, getDocs } from "firebase/firestore";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [foodPosts, setfoodPosts] = useState([]);

    const getUsers = useCallback(async()=>{
        const data = await fetch(collection(db,"donators"));
        console.log(data);
        return data
    })

    useEffect(() => { 
        async function getFoodItemByUserId() {
            const users = await getUsers();
            users.forEach(snapshot => {
                const foodItems = snapshot.ref.collection("foodItems").get();
                console.log(foodItems.docs.map(doc => doc.data()))
            });
            setfoodPosts(foodItems);
            console.log(foodPosts);
        }
        return () => fetchData();
    }, []);
   
  return (
    <Stack spacing={10}>
      <NavBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid Grid item xs={10} sm={12} md={12}>
          <CreateFoodButton />
        </Grid>
        <Grid item xs={10} sm={12} md={12}>
            <FoodList foodData={foodPosts}/>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
