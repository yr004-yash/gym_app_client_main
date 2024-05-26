import React, { useState, useContext } from 'react'
// import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';
// import { loadingToggleAction,loginAction,
// } from '../../store/actions/AuthActions';

// image
//import logo from "../../images/logo-full.png";
import logo from "../images/logo.png";
import logoText from "../images/logo-text.png";
import loginbg from "../images/pic1.png";

function Login(props) {
	const [email, setEmail] = useState('harshdob937@gmail.com');
	let errorsObj = { email: '', password: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('harsh@123');
	const navigate = useNavigate();
	// const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();

		// Validation logic (you can customize this)
		if (!email || !password) {
			setErrors({ email: 'Please fill all the fields', password: '' });
			return;
		}

		try {
			const postData = {
				email,
				password,
			};

			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/clients/signin`, postData);

			// Assuming you have a function to set success message
			// props.setSuccessMessage(response.message);

			// Redirect or do other actions upon successful registration

			localStorage.setItem('token', response.data.token);
			localStorage.setItem('name', response.data.clientName);
			localStorage.setItem('id', response.data.clientId);
			navigate('/', { replace: true });

		} catch (error) {
			// Handle errors from the server
			console.error('Login failed:', error.response.data);
			window.alert('login Failed')
			setErrors({ email: '', password: error.response.data.error });
		}
	};

	return (
		<div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
			<div className="login-aside text-center  d-flex flex-column flex-row-auto">
				<div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
					<div className="text-center mb-4 pt-5 brand-logo">
						<img className="logo-abbr me-1" src={logo} alt="" width="80" />
						<img className="brand-title ms-2" src={logoText} alt="" width="108" />
					</div>
					<h3 className="mb-2">Welcome back!</h3>
					<p>User Experience & Interface Design <br />Strategy SaaS Solutions</p>
				</div>
				<div className="aside-image" style={{ backgroundImage: "url(" + loginbg + ")" }}></div>
			</div>
			<div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
				<div className="d-flex justify-content-center h-100 align-items-center">
					<div className="authincation-content style-2">
						<div className="row no-gutters">
							<div className="col-xl-12 tab-content">
								<div id="sign-in" className="auth-form   form-validation">
									{props.errorMessage && (
										<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
											{props.errorMessage}
										</div>
									)}
									{props.successMessage && (
										<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
											{props.successMessage}
										</div>
									)}
									<form onSubmit={onLogin} className="form-validate">
										<h3 className="text-center mb-4 text-black">Sign in your account</h3>
										<div className="form-group mb-3">
											<label className="mb-1" htmlFor="val-email"><strong>Email</strong></label>
											<div>
												<input type="email" className="form-control"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													placeholder="Type Your Email Address"
												/>
											</div>
											{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
										</div>
										<div className="form-group mb-3">
											<label className="mb-1"><strong>Password</strong></label>
											<input
												type="password"
												className="form-control"
												value={password}
												placeholder="Type Your Password"
												onChange={(e) =>
													setPassword(e.target.value)
												}
											/>
											{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
										</div>
										<div className="form-row d-flex justify-content-between mt-4 mb-2">
											<div className="form-group mb-3">
												<div className="form-check custom-checkbox ms-1">
													<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
													<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
												</div>
											</div>
										</div>
										<div className="text-center form-group mb-3">
											<button type="submit" className="btn btn-primary btn-block">
												Sign In
											</button>
										</div>
									</form>
									<div className="new-account mt-3">
										<p>Don't have an account? <Link className="text-primary" to="/page-register">Sign up</Link></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

// const mapStateToProps = (state) => {
//     return {
//         errorMessage: state.auth.errorMessage,
//         successMessage: state.auth.successMessage,
//         showLoading: state.auth.showLoading,
//     };
// };
export default Login;
