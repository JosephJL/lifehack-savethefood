import React , {useState, useEffect} from 'react'
import { Grid, Typography } from "@material-ui/core";
import { FoodList } from '../components/FoodInfo/FoodList';

import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

const food = [{
    'donator': 'GcDneIt3d1TAIxk960pPKvYx3PV2',
    'title':'Nasi Goreng',
    'location': 'Pasir Ris',
    'type': 'Halal',
    'image': 'something.jpg',
    'quantity': '1kg',
    'expiration': '030622',
    'storage_details': 'Fridge'
},
{
    'donator': 'GcDneIt3d1TAIxk960pPKvYx3PV2',
    'title':'Nasi Goreng',
    'location': 'Pasir Ris',
    'type': 'Halal',
    'image': 'something.jpg',
    'quantity': '1kg',
    'expiration': '030622',
    'storage_details': 'Fridge'
},
{
    'donator': 'GcDneIt3d1TAIxk960pPKvYx3PV2',
    'title':'Nasi Goreng',
    'location': 'Pasir Ris',
    'type': 'Halal',
    'image': 'something.jpg',
    'quantity': '1kg',
    'expiration': '030622',
    'storage_details': 'Fridge'
},
]

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [foodPosts, setfoodPosts] = useState([]);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const q = query(collection(db,"donators")); 
        const unsub = onSnapshot(q, (querySnapshot) => { 
        let users = []; 
        querySnapshot.forEach((doc) => { 
            users.push(doc.data()); 
        }); 
        setUsers(users); 
        }); 
        console.log(users)
        return () => unsub(); 
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
