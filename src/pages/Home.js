import React , {useState, useEffect , useCallback} from 'react'
import { Grid, Typography } from "@material-ui/core";
import { FoodList } from '../components/FoodInfo/FoodList';

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
        <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10} sm={12} md={12}>
            <FoodList foodData={foodPosts}/>
        </Grid>
      </Grid>
    </div>
    )
}

export default Home
