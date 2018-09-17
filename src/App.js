import React, { Component } from 'react';
import './App.css';
import PostsAndUsersDetail from './components/postsAndUsersDetail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel, fab)

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit">
              JSON Placeholder Post List
            </Typography>
          </Toolbar>
        </AppBar>
        <PostsAndUsersDetail></PostsAndUsersDetail>
      </div>
    );
  }
}

export default App;
