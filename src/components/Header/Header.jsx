import "./Header.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ handleToken, setIsConnected }) => {
  const userToken = Cookies.get("userToken");
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div>
          <input type="text" />
          {/* // votre icone de loupe */}
        </div>
        {userToken ? (
          <div>
            <button
              onClick={() => {
                // optimisation via une fonction :
                // handleToken(null);
                Cookies.remove("userToken");
                setIsConnected(false);
              }}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </div>
        )}
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
