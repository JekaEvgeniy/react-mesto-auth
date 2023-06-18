function Login() {
	return (
		<section className="login">
			<h2 className="login__header">Вход</h2>
			<form action="#" className="login__form">
				<input className="login__input" type="email" name="email" placeholder="Email" required />
				<input className="login__input" type="password" name="password" placeholder="Пароль" required />
				<button className="login__button" type="submit">Войти</button>
			</form>
		</section>
	)
}

export default Login;