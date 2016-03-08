import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Profile from './github/Profile'
import Search from './github/Search'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: 'ashelley',
			userData: [],
			userRepos: [],
			perPage: 5
		}
	}	

	componentDidMount() {
		this.getUserData()
		this.getUserRepos()
	}

	getUserData() {
		$.ajax({
			url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({userData: data})
			}.bind(this),
			error: function(xhr,status,err) {
				this.setState({username: null})
				alert(err)
			}.bind(this)
		})
	}

	getUserRepos() {
		$.ajax({
			url: 'https://api.github.com/users/' + this.state.username + '/repos?sort=created&per_page=' + this.state.perPage + '&client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({userRepos: data})
			}.bind(this),
			error: function(xhr,status,err) {
				this.setState({username: null})
				alert(err)
			}.bind(this)
		})
	}	

	handleFormSubmit(username) {
		this.setState({
			username: username
		}, function() {
			this.getUserData()
			this.getUserRepos()
		})
	}

	render() {		
		return (
			<div>
				<Search onFormSubmit={this.handleFormSubmit.bind(this)}/>			
				<Profile {...this.state}/>
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string	
}

App.defaultProps = {
	clientId: '',
	clientSecret: ''
}