function InfoTooltip(props) {
	return (
		<section className={`popup popup_type_info ${props.isOpen ? 'popup_opened' : ''}`} >

			<div className="popup__inside popup__inside_contains_info popup__inside_width_sm">
				<div className="popup__container popup__container_type_info">
					<div className="popup__circle-badge popup__circle-badge_type_success"></div>
					<h2 className="popup__title popup__title_centered popup__title_phone-oversized">Вы успешно зарегистрировались!</h2>

					{/* <div className="popup__circle-badge popup__circle-badge_type_error"></div> */}
					{/* <h2 className="popup__title popup__title_centered popup__title_phone-oversized">Что-то пошло не так!<br/>Попробуйте ещё раз.</h2> */}
				</div>
				<button onClick={props.onClose} className="popup__close" type="button" aria-label="Закрыть"></button>
			</div>

		</section>
	)
}

export default InfoTooltip;