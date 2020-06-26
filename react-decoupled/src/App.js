import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Container } from '@material-ui/core';

import LoginForm from './components/LoginForm';
import NodeReadWrite from './components/NodeReadWrite';

const App = hot(() => (
  <Container maxWidth='md'>
    <LoginForm />

    <NodeReadWrite />
  </Container>
));

export default App;
