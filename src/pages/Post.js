import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import '../App.css'
import axios from 'axios'

export const Post = ({role}) => {
    const [posts, setPosts] = useState([])
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
            let res = await axios.get(`http://localhost:3000/posts`,sendData)
            setPosts(res.data)
        } catch (e) {
            handleErrors(e)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
    async function deleteHandler(id) {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`)
            setPosts(posts.filter((e) => e.id !== id))
            }
        catch (e) {
            handleErrors(e)
        }
    }

    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    return (

        <Paper style={{ maxHeight: 725, overflow: 'auto', display: 'flex', justifyContent: 'center' }} elevation={3}>
            <List component="nav">
                {posts && Array.isArray(posts) && posts.length > 0 && posts.map((post, id) => (
                    <Card sx={{ maxWidth: 400, marginTop: 5 }}>
                        <CardContent onClick={(e) => navigate(`/details/${post.id}`)}>
                            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                                {post.id} - {post.title}
                            </Typography>
                            <Typography paragraph color="text.secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                     {role==='admin' && <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button className="button"> <EditIcon onClick={(e) => navigate(`/edit-post/${post.id}`)}/></Button>
                            <Button className="button"><Delete onClick={() => deleteHandler(post.id)} /></Button>
                        </CardActions>}

                    </Card>
                ))}
            </List>
        </Paper>
    )
}