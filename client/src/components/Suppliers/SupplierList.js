import React from 'react'
import {connect} from 'react-redux'

function SupplierList(props) {
	return (
		<>
		<h1>Products</h1>
		{
			props.suppliers.map(supplier => {
				return (
					<div>{supplier.name}</div>
				)
			})
		}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		suppliers: state.suppliers,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
	}
}

export default connect(mapStateToProps)(SupplierList)