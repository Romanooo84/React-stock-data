
import { MainPage } from 'pages.jsx/MainPage';
import { Header } from './Header';
import {Footer} from './Footer'
import css from '../styles/App.module.css'

export const App = () => {

  return (
    <div className={css.main}>
      <Header></Header>
      <MainPage></MainPage>
      <Footer></Footer>
    </div>
  );
};