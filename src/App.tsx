import './App.css';
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { Loading } from './components';
import HeroSection from './components/HeroSection/HeroSection';

const App: React.FC = () => {

  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />

  return (
    <>
      <Login />
      <Navbar />
      <Switch>
          <Route path="/" exact component={Home} />
      </Switch>
    </>
  )
}

export default App;
