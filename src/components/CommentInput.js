import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import axios from "axios";

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


export const CommentInput = (props) => {
    const [comment, setComment] = useState('')
    const {id, mycomment} = props
    const classes = useStyles({});

    useEffect(() => {
        setComment(mycomment)
    }, [mycomment])



    function handleErrors(response) {
        if (!response.ok) {
            console.error(response);
            throw Error(response.statusText);
        }
        return response;
    }
    return (
        <>
                <div 
                className={classes.root}
                >
                <TextField fullWidth id="standard-basic" label="Standard" variant="standard" value={comment} onChange={(e)=> {
                    setComment(e.target.value)
                    props.onEditComment(e.target.value)
                }} />
                </div>
                </>
    )
}