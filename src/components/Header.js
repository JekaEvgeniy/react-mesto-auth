import headerLogo from '../images/header/header-logo.svg';

function Header() {
	return (
		<header className="header">
			<img className="header__logo" src={headerLogo} alt="Логотип" loading="lazy" />

{/*
			<div className="header__actions">
				<p className="header__email">email@mail.com</p>
				<button className="header__button" type="button">Выйти</button>
			</div>
			<div className="header__actions">
				<a href="#" className="header__link">Регистрация</a>
			</div>
 */}
		</header>
	)
}

export default Header;