import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


function PayableShow(props) {

    const markPaid = (data) => {
        console.log('markpaid')
    }

    return (
        <>
            <div className="orderContainer">
                <div className="orderDetails">
                <div>
                    <strong>{props.payable.payableTo.name}</strong>
                    <br/>
                    <strong>Invoice: {props.payable.invoice}</strong>
                    <br/>
                    <strong>Amount: {props.payable.amount}</strong>
                </div>
                <div style={{textAlign:"right"}}>
                    {
                        moment(props.payable.transactionDate).format('DD-MM-YYYY')
                    }
                    <br/>
                    {/* CHANGE TO NAME */}
                    created by user:
                    {
                        props.business.members.find(member => member.user._id === props.payable.user).user.username
                    }
                </div>
                </div>
                
                <div style={{marginBottom: 10, width: '100%', textAlign: 'center'}}>
                    <h3 style={{color: 'red', marginBottom:'5px'}}>Pending: {props.pending}</h3>
                    <i>
                    {
                        props.payable.remark
                    }
                    </i>
                    <h4>Related transactions</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            props.cashBank.map(trn=>{
                                return (
                                <tr key={trn._id}>
                                    <td>{moment(trn.transactionDate).format('DD-MM-YYYY')}</td>
                                    <td>{trn.creditTo ? <span style={{color: 'red'}}>{-trn.amount}</span> : <span style={{color: 'green'}}>{trn.amount}</span>}</td>
                                    <td>{trn.remark}</td>
                                </tr>
                                )
                            })
                        }
                        </tbody> 
                    </table>
                    
                </div>
            </div>
            {
                !props.isPaid &&
                <div style={{width:'100%', textAlign:'center'}}>
                    Record payment -
                <span className="linkText" style={{marginLeft: '5px',marginRight:'5px'}} onClick={() => markPaid()}>Partial</span>
                <span className="linkText" style={{marginLeft:'5px'}} onClick={markPaid}>Full</span>
                </div>
            }
            <div style={{display:'flex', width: '100%', justifyContent: 'center'}}>

                
                    
                <Link to={`/businesses/${props.payable.business}/expenses/${props.payable._id}/edit`}>
                    <Button><EditIcon /></Button>
                </Link>
                <Button onClick={() => props.handleRemove(props.payable._id)}><DeleteIcon /></Button>
                </div>
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        payable: state.payables.find(payable => payable._id === props.id),
        business: state.user.activeBusiness,
        cashBank: state.cashBank.filter(trn => trn.linkedTo === props.id)
    }
}

export default connect(mapStateToProps)(PayableShow)