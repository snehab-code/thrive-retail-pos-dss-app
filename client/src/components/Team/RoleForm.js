import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

class RoleForm extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			admin: props.permissions.includes('admin') ? true : false,
			view: props.permissions.includes('view') ? true : false,
			update: props.permissions.includes('update') ? true : false,
			create: props.permissions.includes('create') ? true : false
		}
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.checked})
	}

	handleSelect = () => {
		const roleData = {
			id: this.props.memberId,
			admin: this.state.admin,
			view: this.state.view,
			create: this.state.create,
			update: this.state.update
		}
		this.props.onSelect(roleData)
	}

	render() {
		
		return (
			<div onBlur={this.handleSelect}>
			<Checkbox
				name='admin'
				checked={this.state.admin}
				onChange={this.handleChange}
			/>
			<Checkbox
				name='view'
				checked={this.state.view}
				onChange={this.handleChange}
			/>
			<Checkbox
				name='create'
				checked={this.state.create}
				onChange={this.handleChange}
			/>
			<Checkbox
				name='update'
				checked={this.state.update}
				onChange={this.handleChange}
			/>
			</div>
		)
	}
}

export default RoleForm