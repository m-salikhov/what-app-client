import { useDocTitle } from "../../Hooks/useDocTitle";
import notFoundOwl from "./404.jpg";
import "./notFound.scss";

const NotFound = () => {
  useDocTitle("404");

  return (
    <main className="not-found">
      <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
      <div className="not-found_img">
        <img src={notFoundOwl} alt="страница не найдена" />
      </div>
    </main>
  );
};

export default NotFound;
