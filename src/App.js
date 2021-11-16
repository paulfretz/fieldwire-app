import './App.css';
import { ImageTable } from './components/image_table/image_table';
import { BrowserRouter} from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <ImageTable/>
      </BrowserRouter>
    </>
  );
}

export default App;
