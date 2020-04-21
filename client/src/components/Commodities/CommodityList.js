import React from 'react'
import {connect} from 'react-redux'

function CommodityList(props) {
	return (
		<>
		<h1>Products</h1>
		{
			props.commodities.map(commodity => {
				return (
					<div>{commodity.name}</div>
				)
			})
		}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		commodities: state.commodities
	}
}

export default connect(mapStateToProps)(CommodityList)