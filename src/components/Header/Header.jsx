import "./Header.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  handleToken,
  setIsConnected,
  title,
  setTitle,
  priceMax,
  priceMin,
  setPriceMax,
  setPriceMin,
}) => {
  const location = useLocation();
  console.log("ici =>", location);
  const userToken = Cookies.get("userToken");
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>
        <div className="filters">
          <div>
            <input
              type="text"
              placeholder="Recherche des articles"
              value={title}
              id="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            {/* // votre icone de loupe */}
          </div>
          {location.pathname === "/" ? (
            <div className="price-inputs">
              <input
                type="number"
                name="priceMin"
                id="priceMin"
                value={priceMin}
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
              <input
                type="number"
                name="priceMax"
                id="priceMax"
                value={priceMax}
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
            </div>
          ) : null}
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
        <Link to="/publish">
          <button>Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
