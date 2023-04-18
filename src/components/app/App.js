import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import {MainPage, ComicsPages, Page404} from '../pages';


const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/1" element={<ComicsPages/>}/>
            <Route path="*" element={<Page404/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
