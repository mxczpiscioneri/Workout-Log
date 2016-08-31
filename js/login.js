var Notification = React.createClass({
	render: function() {
  	var classNotification = this.props.classNotification;
  	classNotification = classNotification == '' ? 'hidden' : classNotification
    return (
    	<div className={classNotification}>
	    	<div className="absolute position-top position-left position-right bg-darkgray">
					<p className="text-white text-sm bold align-center"><img src={this.props.messageIcon} alt={this.props.message} className="align-middle margin-right-xs" />{this.props.message}</p>
				</div>
			</div>
    );
  }
});

var LoginBox = React.createClass({
	getInitialState: function () {
		return {
			classNotification: ''
		};
	},
	handleSubmit: function (login) {
		var email = login.email;
		var pass = login.pass;

		if (email != 'mxczpiscioneri@gmail.com' || pass != '123456') {
			this.setState({messageIcon: "img/close-circle.png"});
			this.setState({message: "Ops! Email or password is incorrect!"});
		} else {
			this.setState({messageIcon: "img/check-circle.png"});
			this.setState({message: "Login successfully!"});

			//authenticate user
			localStorage.setItem('auth', true);
			
			//hide notification
			setTimeout(function() {
	    	window.location.href= "index.html";
	    }.bind(this), 1000);
		}
		this.setState({classNotification: 'show'});
	},
	render: function() {
		return (
			<div className="grid-container login">
				<Header />
				<Notification message={this.state.message} messageIcon={this.state.messageIcon} classNotification={this.state.classNotification} />
				<LoginForm onLoginSubmit={this.handleSubmit} />
			</div>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<div className="header grid-row padding-top-xl padding-bottom-xl">
				<div className="grid-xs-8 grid-xs-offset-2">
					<h1 className="text-white text-xl">Workout Log</h1>
				</div>
			</div>
		);
	}
});

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			errorEmail: '',
			errorPass: '',
		};
	},
	doSubmit: function (e) {
		e.preventDefault();
		var error = false;
		var data = {
			email: this.refs.email.value.trim(),
			pass: this.refs.pass.value.trim()
		}
		if (!data.email) {
			this.setState({errorEmail: 'Ops! E-mail is required.'});
			error = true;
		} else {
			this.setState({errorEmail: ''});
		}
		if (!data.pass) {
			this.setState({errorPass: 'Ops! Password is required.'});
			error = true;
		} else {
			this.setState({errorPass: ''});
		}

		if (!error) {
			this.props.onLoginSubmit(data);
		}
		return;
	},
	render: function() {
		var errorEmail = this.state.errorEmail; 
		var errorPass = this.state.errorPass;
		return (
			<div className="">

				<div className="grid-row content padding-top-xl">
					<div className="grid-xs-8 grid-xs-offset-2">
						<h1 className="text-secondary text-lg">Login</h1>
					</div>
				</div>

				<div className="grid-row content">
					<form className="form" onSubmit={this.doSubmit}>
						<div className="grid-xs-8 grid-xs-offset-2 margin-bottom-xl">
							<label className="text-sm padding-bottom-xs inline-block text-secondary">E-mail</label>
							<input className="field text-field-lg" ref="email" type="email"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorEmail == "" ? "" : errorEmail}</small>
						</div>
						<div className="grid-xs-8 grid-xs-offset-2 margin-bottom-xl">
							<label className="text-sm padding-bottom-xs inline-block text-secondary">Password</label>
							<input className="field text-field-lg" ref="pass" type="password"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorPass == "" ? "" : errorPass}</small>
						</div>
						<div className="grid-xs-8 grid-xs-offset-2 margin-bottom-xl">
							<button className="btn-lg btn-primary" type="submit">Login</button>
						</div>
					</form>
				</div>

			</div>

		);
	}
});

ReactDOM.render(
	<LoginBox />,
	document.getElementById('content')
);