var ActivitiesBox = React.createClass({
	render: function() {
		return (
			<div className="grid-container bg-white margin-top-xl">
				<Header />
			</div>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<div className="grid-row bg-secondary padding-top-xl padding-bottom-xl">
				<div className="grid-xs-10 grid-xs-offset-1">
					<h1 className="text-white text-xl align-center">Workout Log</h1>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<ActivitiesBox />,
	document.getElementById('content')
);