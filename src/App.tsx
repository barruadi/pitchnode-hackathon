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

const activeChainId = ChainId.Mumbai;

const THIRDWEB_CLIENT_ID = import.meta.env.THIRDWEB_CLIENT_ID;

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
          <Route path="/idea" element={<Idea />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}

export default App;
