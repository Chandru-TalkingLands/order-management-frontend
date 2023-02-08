import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  return( 
    <ChakraProvider>  <MainPage /></ChakraProvider>

  )
}

export default App;
