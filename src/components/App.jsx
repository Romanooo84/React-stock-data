
import { MainPage } from 'pages.jsx/MainPage';
import { Header } from './Header';
import css from '../styles/App.module.css'

export const App = () => {

  return (
    <div className={css.main}>
      <Header></Header>
      <MainPage></MainPage>
    </div>
  );
};