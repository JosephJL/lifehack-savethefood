import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });  

class FoodList extends Component{

    constructor(props){
        super(props)
        this.state = {
            foodData: props.foodData,
        }
    }

    renderItems(food){
        return food.map((item) => (
            <Paper
            sx={{
                p: 2,
                margin: 2,
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={item.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h4 bold" component="div">
                            {item.title}
                            </Typography>
                            <Typography variant="subtitle1" component="div">
                            {item.type}
                            </Typography>
                            <Typography variant="body2" component="div">
                            Quantity: {item.quantity}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Location : {item.location}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Expiration : {item.expiration}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            Storage Instructions : {item.storage_details}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Donator: {item.donator}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <ButtonBase>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                Pick Up
                                </Typography>
                            </ButtonBase>
                        </Grid>
                        </Grid>
                    </Grid>
            </Grid>
          </Paper>
        ));
    }

    render(){
        return (
            <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
            >
                <Grid item xs={6} sm={12} md={12}>
                    <Typography>
                        <span className="text-2xl text-green-600 font-bold">FoodHero Packages</span>
                    </Typography>
                </Grid>
                {this.renderItems(this.state.foodData)}
            </Paper>
        );
    }


}

export {FoodList}