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
    name: 'Item',
    selector: 'commodity.name',
    grow: 2,
    sortable: true
},
{
    name: 'Supplier',
    selector: 'supplier.name',
    maxWidth: '75px',
    sortable: true
},
{
    name: 'Status',
    selector: 'status',
    center: true,
    sortable: true
},
{
    name: 'Quantity',
    selector: 'qty',
    minWidth: '50px',
    maxWidth: '75px',
    center: true
},
{
    name: 'Amount', 
    selector: 'amount',
    minWidth: '50px',
    maxWidth:'70px',
    center: true
}
]

function OrderList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [orderId, setOrderId] = useState('')

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setOrderId(row.transactionDate.id)
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
                <OrderShow id={orderId}/>
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
            {/* - add a Supplier
            <Button>Add Supplier</Button> */}
            {/* - add GRNs on receiving goods ie write to transactions
            <Button>Material Received</Button> */}
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps)(OrderList)