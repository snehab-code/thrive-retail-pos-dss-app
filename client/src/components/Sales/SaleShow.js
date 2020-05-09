import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function SaleShow(props) {
    return (
        <>
            <div className="orderContainer">
                <h2>Sale</h2>
                <div className="orderDetails">
                <div>
                    <strong>Sale - {props.sale.invoiceNumber}</strong>
                    <br/>
                    <span>To - {props.sale.client.name}</span>
                </div>
                <div style={{textAlign:"right"}}>
                    {
                        moment(props.sale.transactionDate).format('DD-MM-YYYY')
                    }
                    <br/>
                    {
                        props.business.members.find(member => member.user._id === props.sale.user).user.name
                    }
                </div>
                </div>
                <table style={{minWidth:'350px'}}>
                    <thead>
                    <tr>
                        <th style={{textAlign: 'left'}}>Product</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.sale.commodities.map((commodity, i) => {
                            const product = props.products.find(prod => prod._id === commodity.product._id)
                            return (
                            <tr key={commodity._id}>
                                {
                                    props.sale.status === 'Pending Delivery' &&
                                    <td style={{textAlign: 'right'}}>
                                        xxx
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
                        props.sale.remark
                    }
                </div>
                <div style={{display:'flex', width: '100%', justifyContent: 'center'}}>
                <Link to={`/businesses/${props.sale.business}/invoices/${props.sale._id}/edit`}>
                    <Button><EditIcon /></Button>
                </Link>

                <Button onClick={() => props.handleRemove(props.sale._id)}><DeleteIcon /></Button>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        sale: state.sales.find(sale => sale._id === props.id),
        products: state.commodities,
        business: state.user.activeBusiness,
        clients: state.clients
    }
}

export default connect(mapStateToProps)(SaleShow)