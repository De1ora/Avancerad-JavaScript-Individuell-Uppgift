import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}

function App() {
  return (
    <BrowserRouter>
      {/* Your app content */}
      <ButtonUsage />
    </BrowserRouter>
  );
}

export default App;