import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import PacksPage from './pages/packs_page';
import { ProtectedRoute } from './components/protected-route';
import Profile, { IProfile } from './pages/auth/profile';
import LoginPage from './pages/auth/login_page';
import axios, { AxiosResponse } from 'axios';
import Favorites from './pages/favorites';
import Shop from './pages/shop';
import PaySuccess from './pages/pay-success';
import Registration from './pages/auth/registration';
import ForgotPassword from './pages/auth/forgot-pass';
import Item from './pages/item';
import PluginsPage from './pages/plugins';
import PresetsPage from './pages/presets';
import Footer from './components/footer';
import AboutPage from './pages/static/about';

export const backend_host = '127.0.0.1:8000';

function App() {
  async function getUserInfo() {
    const config = {
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')?.slice(1, -1),
      }
    }
    const response = await axios.post<IProfile>(
      `http://${backend_host}/api/get-user-info/`, {}, config
      ).catch((error) => {
        if (error) {
          setUser({ message: 'Not auth' } as unknown as IProfile);
        }
      }).then((response) => setUser((response as AxiosResponse)?.data as IProfile));
  }

  useEffect(() => {getUserInfo()}, [])
  
  const [user, setUser] = useState<IProfile>();

  const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/packs", element: <PacksPage/>},
    {path: "/plugins", element: <PluginsPage/>},
    {path: "/presets", element: <PresetsPage/>},

    {path: "/login", element: <LoginPage getUserInfo={getUserInfo}/>},
    {path: "/registration", element: <Registration />},

    {path: "/favorites", element: <Favorites />},
    {path: "/shop", element: <Shop/>},
    {path: "/pay-success", element: <PaySuccess />},
    {path: "/forgot-password", element: <ForgotPassword/>},
    {path: "/item/:id", element: <Item />},
    // auth
    {path: "/profile", element: <ProtectedRoute><Profile profile={user} getUserInfo={getUserInfo}/></ProtectedRoute>},

    // static
    {path: "/about", element: <AboutPage/>},
  ])
  return (
    <div className="container-fluid justify-content-center">
      <Header user={user}/>
      <RouterProvider router={router} />
      <Footer user={user}/>
    </div>
  );
}

export default App;
