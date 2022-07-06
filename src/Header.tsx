import { FaGithub, FaQuestionCircle } from "react-icons/fa";
export function Header() {
  return (
    <header className="site-header hide-when-print">
      <h1 className="site-title">Image Grid</h1>
      <div className="site-subcontent">
        <p className="site-icon">
          <FaQuestionCircle size={"2rem"} />
        </p>
        <p className="site-icon">
          <a
            href="https://github.com/ryokryok/image-grid-app"
            target={"_blank"}
          >
            <FaGithub size={"2rem"} />
          </a>
        </p>
      </div>
    </header>
  );
}
