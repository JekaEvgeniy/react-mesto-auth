import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import api from '../utils/Api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import CurrentUserContext from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

	const [selectedCard, setSelectedCard] = React.useState(null);

	const [currentUser, setCurrentUser] = React.useState({});

	const [cards, setCards] = React.useState([]);

	const [loggedIn, setLoggedIn] = React.useState(false);

	React.useEffect(() => {

		api.getUserInfo()
			.then(setCurrentUser)
			.catch(err => console.error(err));

		api.getCards()
			.then(res => {
				setCards(res);
			})
			.catch(err => console.error(err));

	}, []);

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	}

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	}

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsAddPlacePopupOpen(false);

		setSelectedCard(null);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleUpdateUser(userData) {
		api.setUserInfo(userData)
			.then((updateUserData) => {
				setCurrentUser(updateUserData);

				closeAllPopups();
			})
			.catch(err => console.error(err));
	}

	function handleUpdateAvatar(data) {
		api.setUserAvatar(data)
			.then((updateData) => {
				setCurrentUser(updateData);

				closeAllPopups();
			})
			.catch(err => console.error(err));
	}

	function handleAddNewCard(data) {
		api.addNewCard(data)
			.then((newCard)=> {
				setCards((state) => [newCard, ...state] );
				closeAllPopups();
			})
			.catch((err) => {
				console.error('Warning! Attention! Achtung! Ошибка при добавлении новой карточки!');
			})
	}


	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		// Отправляем запрос в API и получаем обновлённые данные карточки
		api.toggleLike(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => console.error(err));
	}

	function handleCardDelete(card) {
		api.removeCard(card._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch(err => console.error(err));
	}

	return (
		<BrowserRouter>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					<Routes>
						<Route
							path="/"
							element={<Header />}
						/>

						<Route
							path="sign-up"
							element={<Header />}
						/>

						<Route
							path="/"
							element={<Header />}
						/>

						<Route
							path="*"
							element={<Header />}
						/>

					</Routes>

					<Routes>
						<Route
							path="/"
							element={

								loggedIn ? (
									<Main
										onEditProfile={handleEditProfileClick}
										onEditAvatar={handleEditAvatarClick}
										onAddPlace={handleAddPlaceClick}

										cards={cards}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										onCardDelete={handleCardDelete}
									/>
								) : (
									<Navigate to="/sign-in" />
								)

							}
						/>

						<Route
							path="sign-up"
							element={<Register />}
						/>
						<Route
							path="*"
							element={<Login />}
						/>

						<Route
							path="/"
							element={
								<Footer />
							}
						/>
					</Routes>

					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>

					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddNewCard={handleAddNewCard}
					/>

					<ImagePopup
						title="Попап с картинкой"
						card={selectedCard}
						onClose={closeAllPopups}
					/>

					<InfoTooltip
						title="Попап с сообщением"
						onClose={closeAllPopups}
					/>

				</div>
			</CurrentUserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
