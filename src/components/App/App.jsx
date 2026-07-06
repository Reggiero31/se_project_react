import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../profile/Profile.jsx";
import {
  addItem,
  getItems,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  filterDataFromWeatherAPI,
  getForecastWeather,
} from "../../utils/weatherApi";
import { defaultClothingItems, location, apiKey } from "../../utils/constants";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { register, login, checkToken, updateUser } from "../../utils/auth";

function App() {
  const initialWeatherData = {
    type: "warm",
    temperature: { F: 0, C: 0 },
    city: "",
    isDay: true,
    condition: "clear",
  };

  const [weatherData, setWeatherData] = useState(initialWeatherData);

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      checkToken(storedToken)
        .then((user) => {
          setCurrentUser(user);
          setToken(storedToken);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setCurrentUser(null);
          setToken("");
          setIsLoggedIn(false);
        });
    }

    if (location.latitude && location.longitude) {
      getForecastWeather(location, apiKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch(console.error);
    }

    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegister = (inputValues) => {
    setAuthError("");
    register(inputValues)
      .then(() => {
        return login({
          email: inputValues.email,
          password: inputValues.password,
        });
      })
      .then((response) => {
        const user = response.user ?? response.data ?? response;
        const authToken =
          response.token ?? response.jwt ?? response.accessToken ?? "";

        if (authToken) {
          localStorage.setItem("jwt", authToken);
        }

        setCurrentUser(user);
        setToken(authToken);
        setIsLoggedIn(Boolean(authToken || user));
        closeActiveModal();
      })
      .catch(() => {
        setAuthError("Registration failed. Please try again.");
      });
  };

  const handleLogin = (inputValues) => {
    setAuthError("");
    login(inputValues)
      .then((response) => {
        const user = response.user ?? response.data ?? response;
        const authToken =
          response.token ?? response.jwt ?? response.accessToken ?? "";

        if (authToken) {
          localStorage.setItem("jwt", authToken);
        }

        setCurrentUser(user);
        setToken(authToken);
        setIsLoggedIn(Boolean(authToken || user));
        closeActiveModal();
      })
      .catch(() => {
        setAuthError("Login failed. Please check your credentials.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setToken("");
    setIsLoggedIn(false);
    setAuthError("");
  };

  const handleUpdateProfile = (inputValues) => {
    setAuthError("");
    updateUser(inputValues, token)
      .then((response) => {
        const user = response.user ?? response.data ?? response;
        setCurrentUser((prevUser) => ({ ...prevUser, ...user }));
        closeActiveModal();
      })
      .catch(() => {
        setAuthError("Profile update failed. Please try again.");
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    if (!token) {
      return;
    }

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((err) => console.error(err));
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    return addItem(newCardData, token)
      .then((newCard) => {
        setClothingItems((prevItems) => [newCard, ...prevItems]);
        closeActiveModal();
        return newCard;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  const handleDeleteItem = (id) => {
    if (!isLoggedIn) return;

    deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setAuthError("");
      setActiveModal("login");
      return;
    }

    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setAuthError("");
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthError("");
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

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page"></div>
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => {
                setAuthError("");
                setActiveModal("login");
              }}
              onRegisterClick={() => {
                setAuthError("");
                setActiveModal("register");
              }}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                      handleLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          <Footer />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            authError={authError}
            onSwitchToLogin={() => {
              setAuthError("");
              setActiveModal("login");
            }}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            authError={authError}
            onSwitchToRegister={() => {
              setAuthError("");
              setActiveModal("register");
            }}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
            authError={authError}
            currentUser={currentUser}
          />

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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
