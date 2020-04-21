import React from 'react'
import {connect} from 'react-redux'

function CreditorList(props) {
	return (
		<>
		<h1>Creditors</h1>
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
		creditors: state.creditors
	}
}

export default connect(mapStateToProps)(CreditorList)