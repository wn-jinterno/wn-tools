import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Flex } from 'rebass';


import './App.css';

import Home from './pages/Home';
import FlowTreeTool from './pages/FlowTreeTool';
import PageNotFoundCmp from './components/PageNotFoundCmp';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Box width="100%" height="100%">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/flowtreetool" component={FlowTreeTool} />
          <Route component={PageNotFoundCmp} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
