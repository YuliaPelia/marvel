import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from '../home/home';
import Comics from '../comics/comics.js'

const RouterS = () => {

    return (
        <Router>
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/1' element={<Comics />} />
        </Routes>
        </Router>
    )

}

export default RouterS;