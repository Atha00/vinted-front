import "./Offer.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(useParams()); // { id : "69b178197659fbfd4f9ebe26" }
  // destructuring direct :
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offer/" + id,
        );
        console.log("ici details de l'offre =>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <main className="offer">
      <div className="container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section>
            <img
              className="offer-details-image"
              src={data.product_image.secure_url}
              alt="grand aperçu de l'offre"
            />
            <aside>
              <div className="top-details">
                <p className="price">{data.product_price} €</p>
                {data.product_details.map((element, index) => {
                  // console.log(element); // {MARQUE: 'STRADIVARIUS'}
                  const keys = Object.keys(element);
                  return (
                    <div
                      className="details-line"
                      key={index + element[keys[0]]}
                    >
                      <p>{keys[0]}</p> <p>{element[keys[0]]}</p>
                    </div>
                  );
                })}
              </div>

              <h1>{data.product_name}</h1>
              <Link
                to="/payment"
                state={{
                  title: data.product_name,
                  price: data.product_price,
                  id: data._id,
                }}
              >
                <button>Acheter</button>
              </Link>
            </aside>
          </section>
        )}
      </div>
    </main>
  );
};

export default Offer;
