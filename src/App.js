import { BrowserRouter, Routes, Route } from "react-router-dom";
import Show from './Show';
import Home from './Home';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />}>
            
          </Route>
          <Route path="/show/:id" element={<Show />} />
      </Routes>
    
  );
}
export default App; 