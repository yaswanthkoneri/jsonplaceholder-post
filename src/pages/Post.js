import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';

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


export const Post = (props) => {
    const [posts, setPosts] = useState([])
    const classes = useStyles({});
    let navigate = useNavigate();


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
            let res = await fetch("https://jsonplaceholder.typicode.com/posts/", sendData)
            res = await res.json()
            setPosts(res)
        } catch (e) {
            handleErrors(e)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])



    function handleErrors(response) {
        if (!response.ok) {
            console.error(response);
            throw Error(response.statusText);
        }
        return response;
    }
    return (

        <Paper style={{ maxHeight: 725, overflow: 'auto', display: 'flex', justifyContent: 'center' }} elevation={3}>
            <List component="nav">
                {posts && Array.isArray(posts) && posts.length > 0 && posts.map((post, id) => (
                    <Card onClick={(e) => navigate(`/details/${post.id}`)} sx={{ maxWidth: 400, marginTop: 5 }}>
                        <CardContent>
                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <div>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                {post.id} - {post.title}
                            </Typography>
                            </div>
                            <div>
                            <EditIcon onClick={(e) => {
                                }} />
                                <Delete onClick={(e) => {
                                }} />
                                </div>
                                </div>
                            <Typography paragraph color="text.secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Paper>
    )
}