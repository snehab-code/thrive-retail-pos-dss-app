import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import DataTable from 'react-data-table-component'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import { customStylesTable } from '../../config/dataTableTheme'
import OrderShow from './OrderShow'
import { startDeleteOrder } from '../../actions/orders'
import PurchaseAdd from '../Purchases/PurchaseAdd'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    cell: row => `${moment(row.transactionDate.date).format('MMM DD')}`,
    width: '60px'
},
{
    name: '#',
    selector: 'orderNumber',
    width:'75px',
    sortable: true
},
{
    name: 'Supplier',
    selector: 'supplier.name',
    maxWidth: '75px',
    sortable: true
},
{
    name: 'Item',
    selector: 'commodities',
    sortable: true,
    grow: 1,
    cell: row => (
            <div className="subList textSubList">
                {row.commodities.map(commodity => {
                    return (
                        <span key ={commodity.product._id}>{commodity.product.name}</span>
                    )
                })}
            </div>)
},
{
    name: 'Quantity',
    selector: 'commodities',
    minWidth: '50px',
    maxWidth: '75px',
    right: true,
    cell: row => (
            <div className="subList">
                {row.commodities.map(commodity => {
                    return (
                        <span key ={commodity.product._id}>{commodity.quantity}</span>
                    )
                })}
            </div>)
},
{
    name: 'Rate',
    selector: 'rate',
    minWidth: '50px',
    maxWidth: '75px',
    right: true,
    cell: row => (
        <div className="subList">
            {row.commodities.map(commodity => {
                return (
                    <span key ={commodity.product._id}>{commodity.rate}</span>
                )
            })}
    </div>)
},
{
    name: 'Amount', 
    selector: 'amount',
    minWidth: '50px',
    maxWidth:'70px',
    right: true,
    cell: row => (
        <div className="subList">
            {row.commodities.map(commodity => {
                return (
                    <span key ={commodity.product._id}>{commodity.amount}</span>
                )
            })}
        </div>)
},
{
    name: 'Status',
    selector: 'status',
    center: true,
    sortable: true
},
{
    name: 'Total', 
    selector: 'amount',
    minWidth: '50px',
    maxWidth:'70px',
    center: true
}
]

function OrderList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [orderData, setOrderData] = useState({})

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setOrderId(row.transactionDate.id)
        setModalState(true)
    }

    const handleRemove = (id) => {
        props.dispatch(startDeleteOrder(props.match.params.businessId, id))
        setModalState(false)
    }

    const handleDelivery = (orderData) => {
        setModalState(true)
        setOrderData(orderData)
    }

    const closeModal = () => {
        setModalState(false)
        setOrderData({})
    }

    return (
        <div className="businessContentContainer">
        <div className="businessContent">
            <Modal 
                style={modalStyles}
                isOpen={modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModal}
            >
                {
                    orderData.orderNumber ? 
                    <PurchaseAdd orderData={orderData} id={props.match.params.businessId}/>
                    :
                    <OrderShow id={orderId} handleDelivery={handleDelivery} handleRemove={handleRemove}/>
                }
                
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Orders</span>
            <Link to={`/businesses/${props.match.params.businessId}/orders/new`}><IconButton className='tableButton' >
                <Add />
            </IconButton>
            </Link>
            </div>
            <DataTable
                noHeader
                theme = 'green'
                highlightOnHover
                striped
                columns={dataColumns}
                data={props.orders}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            <div className="businessSubContent">
                <div className="subContentBox thirdbox">
                    <h3>More actions</h3>
                    See your completed purchases
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Stats</h3>
                    
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Things</h3>
                    ????
                </div>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.map(order => {
            const commodities = order.commodities.map(commodity => {
                const computedData = {
                    amount: commodity.quantity * commodity.rate
                }
                return {...commodity, ...computedData}
            })
            const amount = order.commodities.reduce((acc, currentval) => {
                return acc.rate*acc.quantity + currentval.rate*currentval.quantity
            })
            const newData = {
                transactionDate: {date: order.transactionDate, id: order._id},
                commodities,
                amount: typeof(amount) === 'number' ? amount : amount.rate*amount.quantity
            }
            return {...order, ...newData}
        })
    }
}

export default connect(mapStateToProps)(OrderList)