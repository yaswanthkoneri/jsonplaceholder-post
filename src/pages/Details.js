import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: "100%",
            backgroundColor: 'grey'
        },
        grid: {
            margin: 0,
            width: "100%",
            backgroundColor: 'grey'
        },
        media: {
            height: 0,
            paddingTop: "56.25%" // 16:9
        },
        actions: {
            display: "flex"
        },
        icon: {
            margin: 0
        },
        card: {
            width: "100%"
        }
    }
});


export const Details = (props) => {
    const [post, setPost] = useState([])
    const {id} = useParams();
    const classes = useStyles({});

    async function fetchPosts() {
        let header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        try {
            let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, sendData)
            res = await res.json()
            setPost([res])
        } catch (e) {
            handleErrors(e)
        }
    }

    useEffect(() => {
        console.log("inside")
        fetchPosts()
    }, [id])



    function handleErrors(response) {
        if (!response.ok) {
            console.error(response);
            throw Error(response.statusText);
        }
        return response;
    }
    return (
        <div>
        <Paper style={{maxHeight: 725, overflow: 'auto', display: 'flex', justifyContent:'center'}} elevation={3}>
                    <List component="nav">
                        {post && Array.isArray(post) && post.length > 0 && post.map((post, id) => (
                                       <Card sx={{ maxWidth: 600, marginTop: 5 }}>
                                       <CardContent>
                                         <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                          {post.id} - {post.title}
                                         </Typography>
                                         <Typography paragraph color="text.secondary">
                                           {post.body}
                                         </Typography>
                                       </CardContent>
                                       </Card>
                        ))}
                    </List>
        {/* <div>
            Comments
        </div> */}
        <Comments id={id}/>
        </Paper>
        </div>
    )
}