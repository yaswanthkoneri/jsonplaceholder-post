import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Post } from './pages/Post';
import { Details } from './pages/Details';
import { makeStyles } from '@mui/styles';
import { EditPosts } from './components/EditPosts';
import Login from './pages/login';
import { Button } from '@mui/material';
import ProtectedRoute from './ProtectedRoute';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      backgroundColor: 'blue',
    }
  }
});


function App() {
  const classes = useStyles({})
  const role = localStorage.getItem('role')
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar className={classes.root}>
          <Typography variant="title" color="inherit">
            JSON Placeholder Post List
          </Typography>
          {role && <Typography sx={{ml:'220px',cursor:'pointer'}} variant="title" color="inherit" onClick={() => {
            localStorage.removeItem('role')
            window.location.reload(false);
          }}>Logout</Typography>}
        </Toolbar>
        <div>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/admin-login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute component={Post} role={role} />} exact />
              <Route path="/details/:id" element={<ProtectedRoute component={Details} role={role} />} exact />
              <Route path="/edit-post/:id" element={<ProtectedRoute component={EditPosts} role={role} />} exact />
            </Routes>
          </BrowserRouter>
        </div>
      </AppBar>
    </div>
  );
}

export default App;
