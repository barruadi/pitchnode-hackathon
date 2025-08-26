import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import { useState, useEffect } from 'react';
import backendActor from './utils/backend';
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
import ProjectDetail from './pages/ProjectDetail';
import UserDashboard from './pages/UserDashboard';

const activeChainId = ChainId.Mumbai;

const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

function App() {
  const DashboardRedirect: React.FC = () => {
    const [user, setUser] = useState<{ role: string } | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        const res = await backendActor.getUser(); // returns ?Text = [] or [value]
        const role = Array.isArray(res) ? res[0] : null;
        console.log("Role:", role);
        setUser(role ? { role } : null);
      };

      fetchUser();
    }, []);

    if (!user) return <div>Loading...</div>;

    if (user.role === "Business") {
      console.log("Business");
      return <UserDashboard />;
    }
    return <DashboardPage />;
  };

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
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route path="/idea/:id" element={<IdeaDetail />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
