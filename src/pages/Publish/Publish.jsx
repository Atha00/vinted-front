import "./Publish.css";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const navigate = useNavigate();
  //     {
  //   "title": "Air Max 90",
  //   "description": "Toutes neuves",
  //   "price": 120,
  //   "condition": "Neuf",
  //   "city": "Paris",
  //   "brand": "Nike",
  //   "size": 44,
  //   "color": "blue",
  //   "picture": selectedFile // le fichier image sélectionné par l'utilisateur
  // }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);

  //   const navigate = useNavigate();
  const token = Cookies.get("userToken");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <main className="publish">
      {token ? (
        <div className="container">
          <h1>Vends tes articles</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              // créer un formdata
              const formData = new FormData();
              // le remplir avec les données des inputs
              formData.append("title", title);
              formData.append("description", description);
              formData.append("color", color);
              formData.append("size", size);
              formData.append("brand", brand);
              formData.append("price", price);
              formData.append("condition", condition);
              formData.append("city", city);
              formData.append("picture", picture);

              for (var pair of formData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
              }
              try {
                // envoyer le formdata avec axios
                const response = await axios.post(
                  "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                  formData,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  },
                );
                console.log(response.data);
                navigate("/");
              } catch (error) {
                console.log(error?.response?.data?.message);
              }
            }}
          >
            <section>
              {previewPicture && (
                <img src={previewPicture} alt="previsualisation de l'image" />
              )}
              <label htmlFor="picture" className="file-label">
                + Ajoute une photo
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  // create the preview
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreviewPicture(objectUrl);
                }}
              />
            </section>
            <section>
              <div>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    handleChange(event, setTitle);
                  }}
                />
              </div>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(event) => {
                  handleChange(event, setDescription);
                }}
              ></textarea>
            </section>
            <section>
              <div>
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(event) => {
                    handleChange(event, setBrand);
                  }}
                />
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  id="size"
                  value={size}
                  onChange={(event) => {
                    handleChange(event, setSize);
                  }}
                />
              </div>
              <div>
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(event) => {
                    handleChange(event, setColor);
                  }}
                />
              </div>
              <div>
                <label htmlFor="condition">État</label>
                <input
                  type="text"
                  id="condition"
                  value={condition}
                  onChange={(event) => {
                    handleChange(event, setCondition);
                  }}
                />
              </div>
              <div>
                <label htmlFor="city">Lieu</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(event) => {
                    handleChange(event, setCity);
                  }}
                />
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(event) => {
                    handleChange(event, setPrice);
                  }}
                />
              </div>
              <input type="checkbox" name="trade" id="trade" />
            </section>
            <button>Ajouter</button>
          </form>
        </div>
      ) : (
        <Navigate to="/login" state={{ from: "/publish" }} />
      )}
    </main>
  );
};

export default Publish;
