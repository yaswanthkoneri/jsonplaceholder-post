import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Post } from './pages/Post';

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: "100%",
            backgroundColor: 'blue'
        }
    }
});


function App() {
  const classes = useStyles({})
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          <Typography variant="title" color="inherit">
            JSON Placeholder Post List
          </Typography>
        </Toolbar>
        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Post/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppBar>
    </div>
  );
}

export default App;
