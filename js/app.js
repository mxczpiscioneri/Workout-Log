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

var ActivitiesBox = React.createClass({
	getInitialState: function () {
		var activities = JSON.parse(localStorage.getItem('activities')) || [];
		var timeTotal = localStorage.getItem('timeTotal') || "0:00";
		return {
			data: activities,
			timeTotal: timeTotal,
			classNotification: ''
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
	scrollToTop: function (scrollDuration) {
		var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
		return scrollStep;
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
		this.setState({messageIcon: "img/close-circle.png"});
		this.setState({message: "Successfully removed!"});
		this.setState({classNotification: 'show'});

		this.scrollToTop(600);
		//hide notification
		setTimeout(function() {
      this.setState({classNotification: ''});
    }.bind(this), 10000);

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
		this.setState({messageIcon: "img/check-circle.png"});
		this.setState({message: "Successfully added!"});
		this.setState({classNotification: 'show'});

		this.scrollToTop(600);
		//hide notification
		setTimeout(function() {
      this.setState({classNotification: ''});
    }.bind(this), 10000);

		localStorage.setItem('activities', JSON.stringify(data));
		localStorage.setItem('timeTotal', timeTotal);
	},
	sortObject: function (property) {
		var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
	},
	handleOrderDate: function () {
		var data = this.state.data;
		data = data.sort(this.sortObject("date"));
		this.setState({data});
	},
	handleOrderType: function () {
		var data = this.state.data;
		data = data.sort(this.sortObject("type"));
		this.setState({data});
	},
	handleOrderTime: function () {
		var data = this.state.data;
		data = data.sort(this.sortObject("time"));
		this.setState({data});
	},
	render: function() {
		return (
			<div className="grid-container">
				<Header />
				<Notification message={this.state.message} messageIcon={this.state.messageIcon} classNotification={this.state.classNotification} />
				<AddActivity onActivitySubmit={this.handleSubmit} />
				<ListActivities data={this.state.data} removeNode={this.handleNodeRemoval} orderDate={this.handleOrderDate} orderType={this.handleOrderType} orderTime={this.handleOrderTime} />
				<TotalActivities timeTotal={this.state.timeTotal} activityTotal={this.state.data.length} />
			</div>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return (
			<div className="header grid-row padding-top-xl padding-bottom-xl">
				<div className="grid-xs-5 grid-xs-offset-1">
					<h1 className="text-white text-xl">Workout Log</h1>
				</div>
				<div className="grid-xs-5 align-right">
					<p className="padding-top-sm text-sm text-white">Matheus Piscioneri | <a href="#" className="logout">logout</a></p>
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

				<div className="grid-row content padding-top-xl">
					<div className="grid-xs-10 grid-xs-offset-1">
						<h1 className="text-secondary text-lg">Insert an Item</h1>
					</div>
				</div>

				<div className="grid-row content">
					<form className="form" onSubmit={this.doSubmit}>
						<div className="grid-xs-3 grid-xs-offset-1">
							<label className="text-sm padding-bottom-xs inline-block text-secondary">Date (dd/mm/aaaa)</label>
							<input className="field text-field-lg" ref="date" type="date"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorDate == "" ? "" : errorDate}</small>
						</div>
						<div className="grid-xs-3">
							<label className="text-sm padding-bottom-xs inline-block text-secondary">Activity</label>
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
							<label className="text-sm padding-bottom-xs inline-block text-secondary">Time spent (hh:mm)</label>
							<input className="field text-field-lg" ref="time" type="time" placeholder="time"/>
							<small className="text-xs text-red margin-top-xl padding-top-xl margin-left-lg absolute position-left">{errorTime == "" ? "" : errorTime}</small>
						</div>
						<div className="grid-xs-2">
							<label className="text-sm padding-bottom-xs inline-block text-secondary">&nbsp;</label>
							<button className="btn-lg btn-primary" type="submit">Add</button>
						</div>
					</form>
				</div>

			</div>

		);
	}
});

var ListActivities = React.createClass({
	getInitialState: function () {
    return {
    	sortDate: false,
    	sortType: false,
    	sortTime: false
    };
  },
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	orderDate: function () {
		this.props.orderDate();
		this.setState({sortDate: true});
		this.setState({sortType: false});
		this.setState({sortTime: false});
		return;
	},
	orderType: function () {
		this.props.orderType();
		this.setState({sortDate: false});
		this.setState({sortType: true});
		this.setState({sortTime: false})
		return;
	},
	orderTime: function () {
		this.props.orderTime();
		this.setState({sortDate: false});
		this.setState({sortType: false});
		this.setState({sortTime: true});
		return;
	},
	render: function() {
		var sortDate = this.state.sortDate ? 'img/sort-descending.png' : 'img/sort-variant.png';
		var sortType = this.state.sortType ? 'img/sort-descending.png' : 'img/sort-variant.png';
		var sortTime = this.state.sortTime ? 'img/sort-descending.png' : 'img/sort-variant.png';
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<ActivityItem date={listItem.date} type={listItem.type} time={listItem.time} nodeId={listItem.id} removeNode={this.removeNode} />
			);
		},this);
		if(this.props.data.length > 0) {
			return (
				<div className="grid-row padding-top-xl content">
					<div className="grid-xs-10 grid-xs-offset-1">
						<table className="table">
			    		<thead className="table-header text-lg text-darkgray">
			    			<tr className="bg-gray">
			    				<td className="padding-sm pointer" onClick={this.orderDate}>Date <img src={sortDate} className="align-middle" alt="Sort"/></td>
			    				<td className="padding-sm pointer" onClick={this.orderType}>Activity <img src={sortType} className="align-middle" alt="Sort"/></td>
			    				<td className="padding-sm pointer" onClick={this.orderTime}>Time <img src={sortTime} className="align-middle" alt="Sort"/></td>
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
		} else {
			return (
				<div className="grid-row padding-top-xl content">
					<div className="grid-xs-10 grid-xs-offset-1">
					</div>
	    	</div>
			);
		}
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
		var iconType;
		switch (this.props.type) {
      case "Aerobics":   				iconType = "img/ic_aerobics.png"; break;
      case "Crossfit": 					iconType = "img/ic_crossfit.png"; break;
      case "Cycling":  					iconType = "img/ic_biking.png"; break;
      case "Dancing":  					iconType = "img/ic_dancing.png"; break;
      case "Gymnastics":  			iconType = "img/ic_gymnastics.png"; break;
      case "Martial Arts":  		iconType = "img/ic_martial_arts.png"; break;
      case "Pilates":  					iconType = "img/ic_pilates.png"; break;
      case "Running":  					iconType = "img/ic_running.png"; break;
      case "Sports":  					iconType = "img/ic_football_soccer.png"; break;
      case "Strength Training": iconType = "img/ic_strength_training.png"; break;
      case "Swimming":  				iconType = "img/ic_swimming.png"; break;
      case "Walking":  					iconType = "img/ic_walking.png"; break;
      case "Other":  						iconType = "img/ic_other.png"; break;
      default:      						iconType = "img/ic_other.png"; break;
    }
		return (
			<tr>
				<td className="padding-lg">{date.toLocaleDateString('en-US', {timeZone: 'UTC'})}</td>
				<td className="padding-lg">
					<img src={iconType} alt={this.props.type} className="bg-gray bd-radius-circle align-middle margin-right-sm" />{this.props.type}</td>
				<td className="padding-lg">{this.props.time}</td>
				<td className="padding-lg align-right"><i className="remove invisible text-lg text-red pointer padding-xs" title="Remove activity" onClick={this.removeNode}>&times;</i></td>
			</tr>
		);
	}
});

var TotalActivities = React.createClass({
	render: function() {
		if(this.props.activityTotal > 0) {
			return (
				<div className="grid-row content padding-top-xl padding-bottom-xl">
					<div className="grid-xs-5 grid-xs-offset-1">
						<h2 className="text-secondary text-md">Total activity: <span className="bold">{this.props.activityTotal}</span></h2>
					</div>
					<div className="grid-xs-5">
						<h2 className="text-primary text-md align-right">Total time: <span className="bold">{this.props.timeTotal}</span></h2>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
});


ReactDOM.render(
	<ActivitiesBox />,
	document.getElementById('content')
);