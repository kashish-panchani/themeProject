import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import CollectionPage from './components/CollectionPage';
import { SelectedItemProvider } from './components/SelectedItemContext';

function App() {
  return (
    <>
      <SelectedItemProvider>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/collection/:text' element={<CollectionPage />} />
        </Routes>
      </SelectedItemProvider>
    </>
  );
}

export default App;
