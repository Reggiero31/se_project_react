import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import {
  filterDataFromWeatherAPI,
  getForecastWeather,
} from "../../utils/weatherApi";
import { defaultClothingItems, location, apiKey } from '../../utils/constants';
import ItemModal from '../ItemModal/ItemModal';
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
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch(console.error);
    }
  }, []);
  
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card)
  }

  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

useEffect(() => {
      const closeByEscape = (e) => {
        if (e.key === 'Escape') {
          closeActiveModal();
        }
      }
      document.addEventListener('keydown', closeByEscape)

      return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  return (
    <div className='app'>
      <div className='app__content'>
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} clothingItems={clothingItems} handleCardClick={handleCardClick} />
      </div>
      <Footer />
      <ModalWithForm title="New garment" buttonText="Add garment" name="add-garment" isOpened={activeModal === "add-garment"}
        onClose={closeActiveModal}>
        <label htmlFor="name" className="modal__label">
          Name{""}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{""}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend"> weather type;</legend>
          <label
            htmlFor="hot"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="hot"
              value="hot"
              type="radio"
              className= "modal__radio-input"
            />
            hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >

            <input
              name="weather"
              id="warm"
              value="warm"
              type="radio"
              className="modal__radio-input"
            />
            warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >

            <input
              name="weather"
              id="cold"
              value="cold"
              type="radio"
              className="modal__radio-input"
            />
            cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} onClose={closeActiveModal}
      />
    </div>
  );
}

export default App
