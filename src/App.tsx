import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Invest from './pages/Invest';
import Idea from './pages/Idea';
import InvestIdea from './pages/InvestIdea';
import Detail from './pages/Detail';
import UpdateBusiness from './pages/UpdateBusiness';
import ProjectDetail from './pages/ProjectDetail';
import UserDashboard from './pages/UserDashboard';

const activeChainId = ChainId.Mumbai;

const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

function App() {
  return (
    <ThirdwebProvider 
      clientId={THIRDWEB_CLIENT_ID}
      activeChain={activeChainId}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/upload-idea" element={<Idea />} />
          <Route path="/update-business" element={<UpdateBusiness />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/detail/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
