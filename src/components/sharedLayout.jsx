import { Outlet } from "react-router-dom";
import { Footer} from "./Footer";
import { Header } from "./Header";
import css from '../styles/SharedLayout.module.css'

export const SharedLayout = () => {
  return (
    <div className={css.mainDiv}>
      <Header />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};