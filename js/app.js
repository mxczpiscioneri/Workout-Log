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
	handleNodeRemoval: function (nodeId) {
		var data = this.state.data;
		var timeTotal = this.state.timeTotal;
		var time = data.filter(function (el) {
			return el.id === nodeId;
		});
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		timeTotal = this.formatTime(this.timestrToSec(timeTotal) - this.timestrToSec(time[0].time))
		this.setState({data});
		this.setState({timeTotal});
		localStorage.setItem('activities', JSON.stringify(data));
		localStorage.setItem('timeTotal', timeTotal);
		return;
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
			<div className="grid-container bg-white">
				<Header />
				<AddActivity onActivitySubmit={this.handleSubmit} />
				<ListActivities data={this.state.data} removeNode={this.handleNodeRemoval} />
				<TotalActivities timeTotal={this.state.timeTotal} activityTotal={this.state.data.length} />
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
	getInitialState: function () {
		return {
			errorDate: '',
			errorType: '',
			errorTime: '',
		};
	},
	doSubmit: function (e) {
		e.preventDefault();
		var error = false;
		var data = {
			date: this.refs.date.value.trim(),
			type: this.refs.type.value.trim(),
			time: this.refs.time.value.trim()
		}
		if (!data.date) {
			this.setState({errorDate: 'Ops! Date is required.'});
			error = true;
		} else {
			this.setState({errorDate: ''});
			error = false;
		}
		if (!data.type) {
			this.setState({errorType: 'Ops! Activity is required.'});
			error = true;
		} else {
			this.setState({errorType: ''});
			error = false;
		}
		if (!data.time) {
			this.setState({errorTime: 'Ops! Time is required...'});
			error = true;
		} else {
			this.setState({errorTime: ''});
			error = false;
		}

		if (!error) {
			this.refs.date.value = '';
			this.refs.type.value = '';
			this.refs.time.value = '';
			this.props.onActivitySubmit(data);
		}
		return;
	},
	render: function() {
		var errorDate = this.state.errorDate; 
		var errorType = this.state.errorType; 
		var errorTime = this.state.errorTime; 
		return (
			<div className="">

				<div className="grid-row padding-top-xl">
					<div className="grid-xs-10 grid-xs-offset-1">
						<h1 className="text-secondary text-lg">Insert an Item</h1>
					</div>
				</div>

				<div className="grid-row">
					<form className="form" onSubmit={this.doSubmit}>
						<div className="grid-xs-3 grid-xs-offset-1">
							<label className="text-sm text-secondary">Date (dd/mm/aaaa)</label>
							<input className="field text-field-lg" ref="date" type="date"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorDate == "" ? "" : errorDate}</small>
						</div>
						<div className="grid-xs-3">
							<label className="text-sm text-secondary">Activity</label>
							<select className="field text-field-lg" ref="type">
								<option value="" disabled selected>Select...</option>
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
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorType == "" ? "" : errorType}</small>
						</div>
						<div className="grid-xs-2">
							<label className="text-sm text-secondary">Time spent (hh:mm)</label>
							<input className="field text-field-lg" ref="time" type="time" placeholder="time"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorTime == "" ? "" : errorTime}</small>
						</div>
						<div className="grid-xs-2">
							<label className="text-sm text-secondary">&nbsp;</label>
							<button className="btn-lg btn-secondary bg-darkgray" type="submit">Add</button>
						</div>
					</form>
				</div>

			</div>

		);
	}
});

var ListActivities = React.createClass({
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<ActivityItem date={listItem.date} type={listItem.type} time={listItem.time} nodeId={listItem.id} removeNode={this.removeNode} />
			);
		},this);
		return (
			<div className="grid-row margin-top-xl">
				<div className="grid-xs-10 grid-xs-offset-1 margin-top-xl">
					<table className="table margin-top-xl">
		    		<thead className="table-header text-lg text-white">
		    			<tr className="bg-primary">
		    				<td className="padding-sm">Date</td>
		    				<td className="padding-sm">Activity</td>
		    				<td className="padding-sm">Time</td>
		    				<td className="padding-sm"></td>
		    			</tr>
		    		</thead>
		    		<tbody className="table-body text-sm text-default">
		        	{listNodes}
		    		</tbody>
		    	</table>
	    	</div>
    	</div>
		);
	}
});

var ActivityItem = React.createClass({
	removeNode: function (e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	render: function() {
		var date = new Date(this.props.date);
		return (
			<tr>
				<td className="padding-lg">{date.toLocaleDateString("pt-BR")}</td>
				<td className="padding-lg">{this.props.date}</td>
				<td className="padding-lg">{this.props.type}</td>
				<td className="padding-lg">{this.props.time}</td>
				<td className="padding-lg align-right"><i className="remove invisible text-lg text-red pointer padding-xs" title="Remove activity" onClick={this.removeNode}>&times;</i></td>
			</tr>
		);
	}
});

var TotalActivities = React.createClass({
	render: function() {
		return (
			<div className="grid-row bg-light margin-top-xl padding-top-xl padding-bottom-xl">
				<div className="grid-xs-5 grid-xs-offset-1">
					<h2 className="text-secondary text-lg">Total activity: <b>{this.props.activityTotal}</b></h2>
				</div>
				<div className="grid-xs-5">
					<h2 className="text-primary text-lg align-right">Total time: <b>{this.props.timeTotal}</b></h2>
				</div>
			</div>
		);
	}
});


ReactDOM.render(
	<ActivitiesBox />,
	document.getElementById('content')
);