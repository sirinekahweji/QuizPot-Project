import './SignIn.css'; 

const SignIn = () => {
    return ( 
        <div className="SignIn">
            <h2 className="TitleSignIn">Sign In</h2>
            <form className="loginForm">
                <div className="FormField">
                    <label htmlFor="username" className="email">Email Address</label>
                    <input type="email" id="username" name="username" placeholder="" required />
                </div>
                <div className="FormField">
                    <label htmlFor="password" className="MotPasse">Password</label>
                    <div className="PasswordContainer">
                        <input type="password" id="password" name="password" placeholder="" required />
                        <button type="button" className="PasswordToggleBtn">
                            {/*<i class="bi bi-eye-fill"></i>*/}
                            <i class="bi bi-eye-slash-fill"></i> 
                            </button>
                    </div>
                    <div className="error-message"></div>
                </div>
                <div className="MotDePasseOublie">
                    <a href="#">Forgot Password ?</a>
                </div>
                <div className="Remember">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember" className="remember">Remember me</label>
                </div>
                <button type="submit" className="SeConnecter">Sign in</button>
            </form>
            <p className="Inscrivez">
                Don't have an account? <br /> 
                <a href="/SignUp" className='signup'>Sign up here</a>
            </p>
        </div>
    );
}
 
export default SignIn;
