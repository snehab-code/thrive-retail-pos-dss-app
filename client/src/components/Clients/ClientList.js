import React from 'react'
import {connect} from 'react-redux'

function ClientList(props) {
	return (
		<>
		<h1>Products</h1>
		{
			props.clients.map(client => {
				return (
					<div>{client.name}</div>
				)
			})
		}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		clients: state.clients,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
	}
}

export default connect(mapStateToProps)(ClientList)