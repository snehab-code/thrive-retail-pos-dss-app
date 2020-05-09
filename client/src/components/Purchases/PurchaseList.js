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
import PurchaseShow from './PurchaseShow'
import {startDeletePurchase} from '../../actions/purchases'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    width:'65px',
    cell: row => `${moment(row.transactionDate).format('MMM DD')}`
},
{
    name: '#',
    selector: 'documentNumber',
    width:'80px',
    sortable: true,
    cell: row => row.documentType && `${row.documentType}-${row.documentNumber}`
},
{
    name: 'Supplier',
    selector: 'supplier.name',
    maxWidth: '75px',
    sortable: true
},
{
    name: 'Invoice',
    selector: 'supplierInvoice',
    minWidth:'100px',
    maxWidth: '100px',
    sortable: true
},
{
    name: 'Due',
    selector: 'creditPeriodDays',
    sortable: true,
    width: '65px',
    cell: row => `${moment(moment(row.invoiceDate) + moment(row.creditPeriodDays)).format('MMM DD')}`
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
    name: 'Total', 
    selector: 'amount',
    minWidth: '50px',
    maxWidth:'70px',
    center: true
},
{
    name: 'Order',
    selector: 'order',
    width:'75px',
    sortable: true,
    cell: row => row.order ? row.order.orderNumber : 'None'
}
]

function PurchaseList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [purchaseId, setPurchaseId] = useState('')

    Modal.setAppElement('#root')  

    const handleRemove = (id) => {
        props.dispatch(startDeletePurchase(props.match.params.businessId, id))
        setModalState(false)
    }

    const handleRowClicked = (row) => {
        setPurchaseId(row._id)
        setModalState(true)
    }

    const closeModal = () => {
        setModalState(false)
    }



    return (
        <>
            <Modal 
                style={modalStyles}
                isOpen={modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModal}
            >
                <PurchaseShow id={purchaseId} handleRemove={handleRemove}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Purchases</span>
            {
                props.permissions && (props.permissions.includes('admin') || props.permissions.includes('create')) &&  
                <Link to={`/businesses/${props.match.params.businessId}/purchases/new`}><IconButton className='tableButton' >
                <Add />
                </IconButton>
                </Link>
            }
            </div>
            <DataTable
                noHeader
                theme = 'green'
                highlightOnHover
                striped
                columns={dataColumns}
                data={props.purchases}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            {/* - add a Supplier
            <Button>Add Supplier</Button> */}
            {/* - add GRNs on receiving goods ie write to transactions
            <Button>Material Received</Button> */}
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        purchases: state.purchases,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(PurchaseList)