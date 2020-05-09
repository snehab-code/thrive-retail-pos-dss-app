import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import CheckBox from '@material-ui/core/Checkbox'
import DoneIcon from '@material-ui/icons/Done'

function OrderShow(props) {

    const [commodityArray, setCommodities] = useState(props.order.commodities.map(comm => {return {'_id': comm._id, isSelected: false, isCompleted: comm.isCompleted}}))

    const handleAllDelivered = () => {
        const orderData = {
            commodities: props.order.commodities.filter(commodity => commodity.isCompleted === false),
            orderNumber: props.order.orderNumber,
            supplier: props.suppliers.find(supplier => supplier._id === props.order.supplier._id),
            remark: `delivery in full of${props.order.commodities.filter(commodity => commodity.isCompleted === false).map(comm => ` ${comm.product.name}`)}`
        }
        props.handleDelivery(orderData)
    }

    const handleProductDelivery = () => {
        const selectedCommodities = commodityArray.filter(comm=>comm.isSelected).map(comm => comm._id)
        const commodities = props.order.commodities.filter(comm => selectedCommodities.includes(comm._id))

        const orderData = {
            commodities,
            orderNumber: props.order.orderNumber,
            supplier: props.suppliers.find(supplier => supplier._id === props.order.supplier._id),
            remark: `delivery of ${commodities.map(comm => comm.product.name)}`
        }

        props.handleDelivery(orderData)

    }

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
                {
                    props.business.members.find(member => member.user._id === props.order.user).user.name
                }
            </div>
            </div>
            <table style={{minWidth:'350px'}}>
                <thead>
                <tr>
                    {
                        props.order.status === 'Pending Delivery' && 
                        <th>
                        <IconButton aria-label="mark delivery">
                            <LocalShippingIcon />
                        </IconButton>
                        </th>
                    }
                    <th style={{textAlign: 'left'}}>Product</th>
                    <th>Rate</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.order.commodities.map((commodity, i) => {
                        const product = props.products.find(prod => prod._id === commodity.product._id)
                        return (
                        <tr key={commodity._id}>
                            {
                                props.order.status === 'Pending Delivery' &&
                                <td style={{textAlign: 'right'}}>
                                    {
                                        !commodity.isCompleted && <CheckBox 
                                            checked={!commodity.isCompleted ? commodityArray[i].isSelected : true}
                                            disabled={commodity.isCompleted}
                                            onChange={() => {
                                                const commodities = [...commodityArray]
                                                commodities[i].isSelected = !commodityArray[i].isSelected
                                                setCommodities(commodities)
                                            }}
                                            inputProps={{'aria-label': 'delivered'}}
                                        />
                                    }
                                </td>
                            }
                            
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
                commodityArray.filter(comm => comm.isSelected).length === commodityArray.length
                ?
                <Button onClick={handleAllDelivered}><DoneAllIcon /></Button>
                :
                commodityArray.find(comm => comm.isSelected) 
                ? 
                <Button onClick={handleProductDelivery}><DoneIcon/></Button> 
                :
                props.order.status === 'Pending Delivery' 
                ?
                <Button onClick={handleAllDelivered}><DoneAllIcon /></Button>
                : 
                ''
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
        business: state.user.activeBusiness,
        suppliers: state.suppliers
    }
}

export default connect(mapStateToProps)(OrderShow)