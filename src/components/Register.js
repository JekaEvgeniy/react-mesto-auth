function Register(){
	return (
		<section className="login">
			<h2 className="login__header">Регистрация</h2>
			<form action="#" className="login__form">
				<input className="login__input" type="email" name="email" placeholder="Email" required />
				<input className="login__input" type="password" name="password" placeholder="Пароль" required />
				<button className="login__button" type="submit">Зарегистрироваться</button>
			</form>

			<p className="login__caption">Уже зарегистрированы? <a className="login__link" href="#">Войти</a></p>
		</section>
	)
}

export default Register;