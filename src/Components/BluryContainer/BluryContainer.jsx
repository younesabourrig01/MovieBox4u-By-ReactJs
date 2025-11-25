import { Header } from "../Header/Header";
import "./BluryContainer.css";

export const BluryContainer = ({ content, title, path, btn }) => {
  return (
    <div className="blur-container mt-4">
      <Header title={title} path={path} btn={btn} />
      {content}
    </div>
  );
};
