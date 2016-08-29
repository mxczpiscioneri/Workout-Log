var ActivitiesBox = React.createClass({
	getInitialState: function () {
		var activities = JSON.parse(localStorage.getItem('activities')) || [];
		var timeTotal = localStorage.getItem('timeTotal') || "0:00";
		return {
			data: activities,
			timeTotal: timeTotal
		};
	},
	generateId: function () {
		return Math.floor(Math.random()*90000) + 10000;
	},
	timestrToSec: function (timestr) {
		var parts = timestr.split(":");
  	return (parts[0] * 3600) + (parts[1] * 60);
  },
	pad: function (num) {
		if(num < 10) {
	    return "0" + num;
	  } else {
	    return "" + num;
	  }
  },
	formatTime: function (seconds) {
		return [this.pad(Math.floor(seconds/3600)%60),
          this.pad(Math.floor(seconds/60)%60)].join(":");
  },
	handleSubmit: function (activity) {
		var data = this.state.data;
		var timeTotal = this.state.timeTotal;
		var id = this.generateId().toString();
		var date = activity.date;
		var time = activity.time;
		var type = activity.type;
		data = data.concat([{id, date, time, type}]);
		timeTotal = this.formatTime(this.timestrToSec(timeTotal) + this.timestrToSec(time))
		this.setState({data});
		this.setState({timeTotal});

		localStorage.setItem('activities', JSON.stringify(data));
		localStorage.setItem('timeTotal', timeTotal);
	},
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