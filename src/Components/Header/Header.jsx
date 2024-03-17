import NavBar from "./NavBar/NavBar";
import "./Header.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <h1>Mailnager</h1>
        <p>Organisez et Suivez vos Candidatures</p>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
