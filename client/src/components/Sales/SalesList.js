//     return (
//         <>
//             <h1>Sales</h1>
//             - Add transaction
//             - generate invoice
//             - Add a client 
//             - add a commodity!
//             - basic total sales report on home page with a selectable period?
//         </>
//     )
// }



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
import SaleShow from './SaleShow'

const dataColumns = [
{
    name: 'On',
    selector: 'transactionDate',
    sortable: true,
    cell: row => `${moment(row.transactionDate.date).format('MMM DD')}`,
    width: '60px'
},
{
    name: 'Invoice Date',
    selector: 'invoiceDate',
    sortable: true,
    cell: row => `${moment(row.invoiceDate).format('DD-MM-YY')}`,
    width: '80px'
},
{
    name: 'Invoice',
    selector: 'invoice',
    sortable: true,
    width:'75px'
},
{
    name: 'Item',
    selector: 'commodity',
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
    name: 'Rate',
    selector: 'rate',
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
},
{
    name: 'Client',
    selector: 'party.name',
    sortable: true
},
{
    name: 'Note',
    selector: 'remark'
}
]

function SalesList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setTransactionId(row.transactionDate.id)
        setModalState(true)
    }

    const closeModal = () => {
        setModalState(false)
    }

    console.log(props)

    return (
        <div className="businessContent">
            <Modal 
                style={modalStyles}
                isOpen={modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModal}
            >
                <SaleShow id={transactionId}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Sales</span>
            <Link to={`/businesses/${props.match.params.businessId}/invoices/new`}><IconButton className='tableButton' >
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
                data={props.sales}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        transactionSales: state.transactions.filter(transaction => transaction.documentType === 'Invoice').map(sale => {
            const client = state.clients.find(client => client._id == sale.party)
            const newData = {
                party: {_id: sale.party, name: client && client.name},
                transactionDate: {date: sale.transactionDate, id: sale._id},
                amount: sale.quantity * sale.rate,
                qty: sale.quantity + ' ' + sale.unit
            }
            return {...sale, ...newData}
        }),
        sales: state.sales
    }
}

export default connect(mapStateToProps)(SalesList)