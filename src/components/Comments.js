import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import { CommentInput } from "./CommentInput";
import EditIcon from '@mui/icons-material/Edit';


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


export const Comments = (props) => {
    const [comments, setComments] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const { id } = props
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
            let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, sendData)
            res = await res.json()
            setComments(res.map((e)=> ({editing: false, ...e})))
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
        <div
            className={classes.root}
        >
            {/* {JSON.stringify(comments)} */}
            <List component="nav">
                {comments && Array.isArray(comments) && comments.length > 0 && comments.map((comment, id) => (
                    <div key={id}>
                        <ListItem
                            button
                            divider
                            onClick={(e) => console.log(e)}
                        >
                            <ListItemText
                                primary={comment.name}
                                secondary={"email: " + comment.email}
                            />
                            {!comment.editing && <ListItemText
                                primary={comment.body}
                            />}
                            <EditIcon onClick={(e)=> {
                                const mod = [...comments].map((e)=> {
                                    if (e.id === comment.id) {
                                        return {...e, editing: true}
                                    } else {
                                        return e
                                    }
                                })
                               setComments(mod)
                            }}/>
                            {comment.editing && <CommentInput mycomment={comment.body}/>}
                        </ListItem>
                    </div>
                ))}
            </List>
            <CommentInput />
        </div>
    )
}