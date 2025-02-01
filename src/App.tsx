import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Invest from './pages/Invest';
import Idea from './pages/Idea';
<<<<<<< HEAD
import InvestIdea from './pages/InvestIdea';
=======
import Detail from './pages/Detail';
>>>>>>> feat/fe-detail

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/idea" element={<Idea />} />
<<<<<<< HEAD
        <Route path="/business/:id" element={<InvestIdea/>}></Route>
=======
        <Route path="/detail" element={<Detail />} />
>>>>>>> feat/fe-detail
      </Routes>
    </Router>
  );
}

export default App;
