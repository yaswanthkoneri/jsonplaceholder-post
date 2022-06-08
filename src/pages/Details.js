import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";


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
        <>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="baseline"
            spacing={24}
            className={classes.grid}
        >
            <Grid item xs={6}>
                <div 
                className={classes.root}
                >
                    <List component="nav">
                        {post && Array.isArray(post) && post.length > 0 && post.map((post, id) => (
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
                                                  <ListItemText
                                        primary={post.body}
                                    />
                                </ListItem>
                            </div>
                        ))}
                    </List>
                </div>
            </Grid>
        </Grid>
        <div>
            Comments
        </div>
        <Comments id={id}/>
        </>
    )
}