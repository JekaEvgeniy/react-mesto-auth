import headerLogo from '../images/header/header-logo.svg';

function Header() {
	return (
		<header className="header">
			<img className="header__logo" src={headerLogo} alt="Логотип" loading="lazy" />
		</header>
	)
}

export default Header;