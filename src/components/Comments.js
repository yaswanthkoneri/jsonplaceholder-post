import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import { CommentInput } from "./CommentInput";
import EditIcon from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import axios from 'axios';

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
    const [editedComment, setEditedComment] = useState('')
    const { id, role } = props
    const classes = useStyles({});

    async function fetchComments() {
        let header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        try {
            let res = await axios.get(`http://localhost:3000/posts/${id}/comments`, sendData)
            setComments(res.data.map((e) => ({ editing: false, ...e })))
        } catch (e) {
            handleErrors(e)
        }
    }

    async function editComments(data) {
        let header = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data'
        });
        let sendData = {
            mode: 'cors',
            header: header
        };
        try {
           let res =  await axios.put(`http://localhost:3000/comments/${id}`, sendData)
            return res.data
        } catch (e) {
            handleErrors(e)
        }
    }

    async function deleteComments(id) {
        try {
            await axios.delete(`http://localhost:3000/comments/${id}`)
        } catch (e) {
            handleErrors(e)
        }
    }


    useEffect(() => {
        fetchComments()
    }, [id])



    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    return (
        <Paper style={{ maxHeight: 725, overflow: 'auto', display: 'flex', justifyContent: 'center' }} elevation={3}>
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
                                secondary={comment.email}
                            />
                            {!comment.editing && <ListItemText
                                primary={comment.body}
                            />}
                            {role === 'admin' && <div>
                                <EditIcon onClick={(e) => {
                                    const mod = [...comments].map((e) => {
                                        if (e.id === comment.id) {
                                            return { ...e, editing: true }
                                        } else {
                                            return e
                                        }
                                    })
                                    setComments(mod)
                                    // fetchComments()

                                }} />
                                <Delete onClick={(e) => {
                                  deleteComments(comment.id)
                                  fetchComments()
                                }} />
                            </div>}
                            {comment.editing && <CommentInput mycomment={comment.body} onEditComment={(e) => {
                                setEditedComment(e)
                            }} />}
                            {comment.editing && <Button title="Save" onClick={(e) => {
                                let {editing, postId, ...rest} = { ...comments.find(e => e.id === comment.id), body: editedComment}
                                editComments({body: rest.body, id: rest.id})
                                const mod = [...comments].map((e) => {
                                    if (e.id === comment.id) {
                                        return { ...e, body: editedComment, editing: false }
                                    } else {
                                        return e
                                    }
                                })
                                setComments(mod)
                            }}> Save </Button>}
                        </ListItem>
                    </div>
                ))}
            </List>
            {/* <CommentInput /> */}
        </Paper>
    )
}