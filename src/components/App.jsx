import { MainPage } from '../pages/MainPage';
import { AlleNews } from '../pages/news';
import { SharedLayout } from './sharedLayout';
import { Contact } from 'pages/Contact';
import { Details } from 'pages/Details';
import { Route, Routes, Navigate} from "react-router-dom";

export const App = () => {
  return (
    <Routes>
      <Route path="/React-stock-data/" element={<SharedLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<MainPage />} />
        <Route path="news" element={<AlleNews/>} />
        <Route path="details" element={<Details />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};
