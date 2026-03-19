import { useState,useEffect } from 'react';
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
const [weatherData, setweatherData] = useState({
  type: "warm",
  temp: {F: 999 },
  city: "",
});

const [clothingItems, setClothingItems] = useState([""]);
const [activeModal, setActiveModal] = useState("");
const openAddItemModal =() => {
    setActiveModal("add-garment");
}
useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          setweatherData(filterDataFromWeatherAPI(data));
        })
        .catch(console.error);
    }
  }, []);
  useEffect(() => {
    setClothingItems(defaultClothingItems);
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
    getForecastWeather(weatherData,apiKey)
    .then((data) => {
      const filterData = filterWeatheData(data);
      setweatherData(filterData);
    })
       .catch(console.error)
  })



  return (
  <div className='app'>
    <div className='app__content'>
      <Header  handleAddClick= {handleAddClick} weatherData={weatherData} />
      <Main weatherData={weatherData} clothingItems={clothingItems} handleCardClick={handleCardClick} />
    </div>
    <Footer/> 
    <ModalWithForm title="New garment" buttonText= "Add garment" activeModal={activeModal}
      handleCloseClick={closeActiveModal}>
         <label htmlFor="name" className="modal__label">
                Name{""}
                <input 
                type="" 
                className="modal__input" 
                id="Name" 
                placeholder="Name"
                />
                </label>
                  <label htmlFor="imageUrl" className="modal__label">
                Image{""}
                <input 
                type="text" 
                className="modal__input" 
                id="imageUrl" 
                placeholder="image URL"
                />
                </label>
                <fieldset className="modal__radio-buttons">
                    <legend className="modal__legend"> weather type;</legend>
                    <label 
                    htmlFor="warm" 
                    className="modal__label modal__label_type_radio"
                    >
                        <input 
                        type="radio" 
                        className="modal__input modal__input_type_radio" 
                        /> 
                        </label>    
                            <label 
                    htmlFor="hot" 
                    className="modal__label modal__label_type_radio"
                    >
                        <input 
                        id="cold"
                        type="radio" 
                        className="modal__radio-input" 
                        />
                        </label>  
                </fieldset>
    </ModalWithForm>
    <ItemModal activeModal={activeModal} card={selectedCard} onClose={closeActiveModal} 
    />
  </div>
  );
}

export default App
