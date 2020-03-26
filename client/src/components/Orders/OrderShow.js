import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

function OrderShow(props) {

    return (
        <>
            <div className="orderContainer">
                <h2>Order</h2>
                <div className="orderDetails">
                <div>
                    <strong>Order - {props.order.orderNumber}</strong>
                    <br/>
                    <span>{props.order.supplier.name}</span>
                </div>
                <div style={{textAlign:"right"}}>
                    {
                        moment(props.order.transactionDate).format('DD-MM-YYYY')
                    }
                    <br/>
                    {/* CHANGE TO NAME */}
                    {
                        props.business.members.find(member => member.user._id === props.order.user).user.username
                    }
                </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th style={{textAlign: 'left'}}>Product</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.order.commodities.map(commodity => {
                            const product = props.products.find(prod => prod._id === commodity.product._id)
                            return (
                            <tr key={commodity._id}>
                                <td>
                                {
                                    props.order.status === 'Pending Delivery' && 
                                    <IconButton aria-label="mark delivery">
                                        <LocalShippingIcon />
                                    </IconButton>
                                }
                                </td>
                                <td>
                                {commodity.product.name} </td>
                                <td style={{textAlign: 'right'}}>₹{commodity.rate}</td>
                                <td>x {commodity.quantity} {product.unit}</td>
                                <td>
                                ₹{commodity.rate * commodity.quantity}
                                </td>
                            </tr>
                            
                            )
                        })
                    }
                    </tbody>
                </table>
                <div style={{marginBottom: 10, width: '100%'}}>
                    {
                        props.order.remark
                    }
                </div>
                <div style={{display:'flex', width: '100%', justifyContent: 'center'}}>
                <Link to={`/businesses/${props.order.business}/orders/${props.order._id}/edit`}>
                    <Button><EditIcon /></Button>
                </Link>
                {
                    props.order.status === 'Pending Delivery' && <Button><DoneAllIcon/></Button>
                }
                <Button onClick={() => props.handleRemove(props.order._id)}><DeleteIcon /></Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        order: state.orders.find(order => order._id === props.id),
        products: state.commodities,
        business: state.user.activeBusiness
    }
}

export default connect(mapStateToProps)(OrderShow)