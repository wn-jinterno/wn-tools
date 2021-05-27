import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Box, Flex } from 'rebass';


import './App.css';

import Home from './pages/Home';
import FlowTreeTool from './pages/FlowTreeTool';

function App() {
  return (
    <Router>
      <Box width="100%">
        <Route exact path="/" component={Home} />
        <Route path="/flowtreetool" component={FlowTreeTool} />
      </Box>
    </Router>
  );
}

export default App;
