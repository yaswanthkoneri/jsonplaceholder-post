import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Post } from './pages/Post';


function App() {
  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
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
