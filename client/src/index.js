import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './views/App';
import Home from './views/Home';
import Favorites from './views/Favorites';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>
    <BrowserRouter>
    <div>
        <Route path="/" component={App}/>
        <Route path="/home" component={Home}/>
        <Route path="/favorites" component={Favorites}/>
    </div>
    </BrowserRouter>
  </MuiThemeProvider>, 
  document.getElementById('root'));
  
registerServiceWorker();
