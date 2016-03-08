import React, {Component} from 'react'

export default class Search extends Component {
	onSubmit(e) {
		e.preventDefault()
		let username = this.refs.username.value.trim()
		if(!username) {
			alert('please enter a username')
		}
		this.props.onFormSubmit(username)
		this.refs.username.value = ''
	}
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Search github users</label>
					<input type="text" ref="username" className="form-control" />
				</form>
			</div>
		)
	}
}