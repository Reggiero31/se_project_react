import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../profile/Profile.jsx";
import { addItem, getItems, deleteItem } from "../../utils/api.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  filterDataFromWeatherAPI,
  getForecastWeather,
} from "../../utils/weatherApi";
import { defaultClothingItems, location, apiKey } from "../../utils/constants";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  //const {weatherTemp, setweatherData} = useState({ type: "hot" });
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temperature: 0,
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState("");
  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          console.log(data);
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch(console.error);
    }
    getItems().then((items) => {
      setClothingItems(items);
    });
  }, []);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleAddItem = (item) => {
    api;
    setClothingItems([item, clothing]);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    // call the fetch function
    // .then() includes all the stuff below
    const newCardData = {
      name: inputValues.name,
      link: inputValues,
      weather: inputValues.weatherType,
    };
    addItem(newCardData)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [activeModal]);

  console.log(activeModal);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page"></div>
      <div className="app">
        <div className="app__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
          </Routes>
        </div>
        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
          onClose={closeActiveModal}
        />

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
