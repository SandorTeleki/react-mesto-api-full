import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/api.js';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import * as authApi from '../utils/authApi'
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import NotFound from './NotFound';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false)
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegisterSuccessful, setRegisterSuccessful] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return
    }
    authApi.verifyUser(jwt)
      .then((data) => {
        setEmail(data.email);
        setIsLoggedIn(true)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(jwt), api.getInitialCards(jwt)])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn])

  useEffect(() => {
    isLoggedIn ? navigate('/') : navigate('/sign-in');
  }, [isLoggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(name, description) {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    api.editProfile({name, description}, jwt)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.updateUserAvatar(avatar, jwt)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    const jwt = localStorage.getItem('jwt');
    if (!isLiked) {
      api.likeCard(card._id, jwt)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      api.dislikeCard(card._id, jwt)
        .then((newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  function handleCardDeleteSubmit(card) {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.deleteCard(card._id, jwt)
      .then(() => {
        setCards((cards) => {
          return cards.filter(c => {
            return c._id !== card._id
          });
        });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(name, link) {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    api.addNewCard({name, link}, jwt)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleConfirmCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setDeletedCard(card);
  }

  function onLogin(password, email) {
    setIsLoading(true);
    authApi.signIn(password, email)
      .then((data) => {
        const jwt = data.token;
        localStorage.setItem('jwt', jwt);
        setIsLoggedIn(true);
        setEmail(email);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function onRegister(password, email) {
    setIsLoading(true);
    authApi.signUp(password, email)
      .then((data) => {
        setEmail(data.email);
        setIsInfoToolTipOpen(true);
        setRegisterSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolTipOpen(true);
        setRegisterSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function onLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  }

  function closeInfoToolTip() {
    closeAllPopups();
    isRegisterSuccessful ? navigate('/') : navigate('/sign-up');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header 
        isLoggedIn={isLoggedIn}
        email={email || ''}
        onLogOut={onLogOut}/>
      <Routes>
        <Route 
          path={'/'}
          element={<ProtectedRoute 
            isLoggedIn={isLoggedIn}>
            <Main 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmCardDelete}/>
          </ProtectedRoute>}/>
        <Route 
          path={'/sign-up'}
          element={
            <Register 
              isLoading={isLoading}
              onRegister={onRegister}/>}
          isLoggedIn={isLoggedIn}/>
      <Route 
        path={'/sign-in'}
        element={<Login
        onLogin={onLogin}
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}/>}/>
      <Route 
        path={'*'}
        element={<NotFound isLoggedIn={isLoggedIn}/>}/>
    </Routes>
    <Footer/>
    <EditProfilePopup 
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      onLoading={isLoading}/>
    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      onLoading={isLoading}/>
    <AddPlacePopup 
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlace={handleAddPlaceSubmit}
      onLoading={isLoading}/>
    <ConfirmDeletePopup 
      isOpen={isConfirmDeletePopupOpen}
      onClose={closeAllPopups}
      onLoading={isLoading}
      card={deletedCard}
      onSubmit={handleCardDeleteSubmit}/>
    <ImagePopup 
      card={selectedCard}
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}/>
    <InfoToolTip 
      isSuccess={isRegisterSuccessful}
      isOpen={isInfoToolTipOpen}
      onClose={closeInfoToolTip}/>
  </CurrentUserContext.Provider>)
}

export default App;
