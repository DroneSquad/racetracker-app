// import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
//
// import loginImg from '../../../media/ds-full-logo.svg';
// import loadingImg from '../../../media/ds-full-logo-spin.svg';
// import './login.css';
//
// /** This handles the view of the login window */
// class Login extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onChange = this.onChange.bind(this);
//   }
//
//   /** Handle the login logic */
//   onSubmit(event) {
//     event.preventDefault();
//     this._loading = true;
//     const login = this._email.value;
//     const password = this._password.value;
//     // this.props.dispatch(authorize(login, password));
//     return false;
//   }
//
//   /** Remove the error class from the element */
//   onChange() {
//     this._email.classList.remove('error');
//     this._password.classList.remove('error');
//   }
//
//   render() {
//     // TODO: on successful login forward to the from state location (previously attempted access)
//     console.log(this.props);
//     let { token, error, location } = this.props;
//
//     if (token) {
//       // Redirect to the place where we want to go to
//       let to = (location.search || '').split('redirect=')[1] || '/';
//       return <Redirect to={to} />;
//     }
//
//     if (error) {
//       this._loading = false;
//     }
//
//     return (
//       <form className="login" method="post" onSubmit={this.onSubmit}>
//         <img src={this._loading ? loadingImg : loginImg} className="logo" alt="" />
//         <input type="hidden" value="prayer" />
//         <input
//           onChange={this.onChange}
//           className={error ? 'error' : ''}
//           ref={ref => (this._email = ref)}
//           type="email"
//           placeholder="Email"
//           required
//         />
//         <input
//           onChange={this.onChange}
//           className={error ? 'error' : ''}
//           ref={ref => (this._password = ref)}
//           type="password"
//           placeholder="Password"
//           required
//         />
//         <input type="submit" value={this._loading ? 'Signing in...' : 'Sign in'} />
//         <br />
//         <a
//           className="link"
//           rel="noopener noreferrer"
//           target="_blank"
//           href="https://dronesquad.com/account/register"
//         >
//           Sign up for a Drone Squad account!
//         </a>
//       </form>
//     );
//   }
// }
//
// const mapStateToProps = state => ({
//   token: state.auth.token,
//   error: state.auth.error
// });
//
// export default connect(mapStateToProps)(Login);
