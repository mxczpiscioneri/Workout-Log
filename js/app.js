var ActivitiesBox = React.createClass({
	render: function() {
		return (
			<div className="grid-container bg-white margin-top-xl">
				<Header />
				<AddActivity onActivitySubmit={this.handleSubmit} />
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

var AddActivity = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();

		var data = {
			time: this.refs.time.value.trim(),
			type: this.refs.type.value.trim(),
			date: this.refs.date.value.trim()
		}
		if (!data.time || !data.type || !data.date) {
			alert('Complete the fields!');
			return;
		} else{
			this.refs.time.value = '';
			this.refs.type.value = '';
			this.refs.date.value = '';
		}
		this.props.onActivitySubmit(data);
		return;
	},
	render: function() {
		return (
			<div className="">

				<div className="grid-row padding-top-xl">
					<div className="grid-xs-10 grid-xs-offset-1">
						<h1 className="text-secondary text-lg">Insert an Item</h1>
					</div>
				</div>

				<div className="grid-row">
					<form className="form" onSubmit={this.doSubmit}>
						<div className="grid-xs-2 grid-xs-offset-1">
							<input className="field text-field-lg" ref="time" type="time" placeholder="time"/>
						</div>
						<div className="grid-xs-3">
							<select className="field text-field-lg" ref="type">
								<option value="" disabled selected>Select activity...</option>
								<option value="Aerobics">Aerobics</option>
								<option value="Crossfit">Crossfit</option>
								<option value="Cycling">Cycling</option>
								<option value="Dancing">Dancing</option>
								<option value="Gymnastics">Gymnastics</option>
								<option value="Martial Arts">Martial Arts</option>
								<option value="Pilates">Pilates</option>
								<option value="Running">Running</option>
								<option value="Sports">Sports</option>
								<option value="Strength Training">Strength Training</option>
								<option value="Swimming">Swimming</option>
								<option value="Walking">Walking</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="grid-xs-3">
							<input className="field text-field-lg" ref="date" type="date" placeholder="date"/>
						</div>
						<div className="grid-xs-2">
							<button className="btn-lg btn-secondary bg-darkgray" type="submit">Add</button>
						</div>
					</form>
				</div>

			</div>

		);
	}
});

ReactDOM.render(
	<ActivitiesBox />,
	document.getElementById('content')
);