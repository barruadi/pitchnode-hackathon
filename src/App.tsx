import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Invest from './pages/Invest';
import Idea from './pages/Idea';
import Detail from './pages/Detail';
import UpdateBusiness from './pages/UpdateBusiness';
import DiscoverPage from './pages/InvestorDiscover';
import DashboardPage from './pages/InvestorDashboard';
import IdeaDetail from './pages/IdeaDetail';

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
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/idea/:id" element={<IdeaDetail />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
