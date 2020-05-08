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
		clients: state.clients
	}
}

export default connect(mapStateToProps)(ClientList)