import React from 'react'
import {connect} from 'react-redux'

function CreditorList(props) {
	return (
		<>
		<h1>Products</h1>
		{
			props.creditors.map(creditor => {
				return (
					<div>{creditor.name}</div>
				)
			})
		}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		creditors: state.creditors,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
	}
}

export default connect(mapStateToProps)(CreditorList)