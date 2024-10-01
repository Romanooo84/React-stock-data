import { Currency } from 'pages/Currency';
import { MainPage } from '../pages/MainPage';
import { AlleNews } from '../pages/news';
import { SharedLayout } from './sharedLayout';
import { Contact } from 'pages/Contact';
import { Details } from 'pages/Details';
import { Route, Routes, Navigate } from "react-router-dom";
import CheckRoute from '../hooks/CheckRoute';

export const App = () => {

  return (
    <Routes>
      <Route path="/React-stock-data/" element={<SharedLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<MainPage />} />
        <Route path="details" element={<CheckRoute
              redirectTo="/React-stock-data/"
              element={<Details />}
            />} />
        <Route path="news" element={<AlleNews/>} />
        <Route path="currency" element={<Currency />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};
