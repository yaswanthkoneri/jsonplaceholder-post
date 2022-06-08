import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";


export const Post = (props) => {
    const [posts, setPosts] = useState([])

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
            console.log(res)
            setPosts(res)
        } catch (e) {
            handleErrors(e)
        }
    }

    useEffect(() => {
        console.log("inside")
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
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="baseline"
            spacing={24}
        >
            <Grid item xs={4}>
                <div>
                    <List component="nav">
                        {posts && Array.isArray(posts) && posts.length > 0 && posts.map((post, id) => (
                            <div key={id}>
                                <ListItem
                                    button
                                    divider
                                    onClick={(e) => console.log(e)}
                                >
                                    <ListItemText
                                        primary={post.title}
                                        secondary={"Id: " + post.id}
                                    />
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </div>
            </Grid>
        </Grid>
    )
}