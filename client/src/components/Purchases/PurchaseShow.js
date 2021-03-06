import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function PurchaseShow(props) {
    return (
    <>
        <div className="orderContainer">
            <div className="orderDetails">
            <div>
                <strong>$$$</strong>
                <br/>
                <span></span>
            </div>
            <div style={{textAlign:"right"}}>
                {
                    moment(props.purchase.transactionDate).format('DD-MM-YYYY')
                }
                <br/>
                {/* CHANGE TO NAME */}
                {
                    props.business.members.find(member => member.user._id === props.purchase.user).user.username
                }
            </div>
            </div>
            
            <div style={{marginBottom: 10, width: '100%', textAlign: 'center'}}>
                <h3>{props.purchase.amount}</h3>
                {
                    props.purchase.remark
                }
            </div>
            <div style={{display:'flex', width: '100%', justifyContent: 'center'}}>
            <Link to={`/businesses/${props.purchase.business}/purchases/${props.purchase._id}/edit`}>
                <Button><EditIcon /></Button>
            </Link>
            <Button onClick={() => props.handleRemove(props.purchase._id)}><DeleteIcon /></Button>
            </div>
        </div>
    </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        purchase: state.purchases.find(purchase => purchase._id === props.id),
        business: state.user.activeBusiness
    }
}

export default connect(mapStateToProps)(PurchaseShow)