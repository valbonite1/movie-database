import './App.css';
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { Loading } from './components';
import Movie from './components/Movie/Pagination/Movie';
import MovieDetail from './components/Movie/Pagination/MovieDetail/MovieDetail';
import ProtectedRoute from './auth/protected-route';
import SearchResult from './components/Movie/Pagination/Search/SearchResult';
import Footer from './components/Footer/Footer';


const App: React.FC = () => {


  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <Login />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies/page/:page" component={Movie} />
        <Route path="/movies/:_id/:title" component={MovieDetail} />
        <Route path="/search/:page" component={SearchResult} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
