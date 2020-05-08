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
import CashShow from './CashShow'
import {startDeleteCashBank} from '../../actions/cashBank'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    width:'65px',
    cell: row => `${moment(row.transactionDate.date).format('MMM DD')}`
},
{
    name: 'Party',
    selector: row => row.creditTo ? row.creditTo.name : row.debitFrom ? row.debitFrom.name : '',
    sortable: true
},
{
    name: 'Amount', 
    selector: 'amount',
    center: true
},
{
    name: 'Related Document',
    selector: 'linkedTo',
    sortable: true,
    cell: row => !row.linkedTo ? 'loading' : row.linkedTo.documentNumber ? row.linkedTo.documentNumber : row.linkedTo.invoiceNumber ? row.linkedTo.invoiceNumber : row.linkedTo.payableTo ? row.linkedTo.invoice : 'Does not exist'
},
{
    name: 'Notes',
    selector: 'remark',
    center: true,
    sortable: true
},
{
    name: 'Mode',
    selector: 'mode',
    sortable: true
}
]

function CashList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [cashId, setCashId] = useState('')

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setCashId(row.transactionDate.id)
        setModalState(true)
    }

    const handleRemove = (id) => {
        props.dispatch(startDeleteCashBank(props.match.params.businessId, id))
        setModalState(false)
    }

    const closeModal = () => {
        setModalState(false)
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
                <CashShow id={cashId} handleRemove={handleRemove}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Cash Book</span>
            {
                props.permissions && props.permissions.includes('admin' || 'create') && 
                <Link to={`/businesses/${props.match.params.businessId}/cashbook/new`}><IconButton className='tableButton' >
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
                data={props.payments}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            <div className="businessSubContent">
                <div className="subContentBox thirdbox">
                    <h3>More actions</h3>
                    Cash Transactions by period
                </div>
                <div className="subContentBox thirdbox">
                    <h3>???</h3>
                    ???
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Stats</h3>
                    ????
                </div>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        payments: state.cashBank.map(payment => {
			const stakeholders = [...state.clients, ...state.creditors, ...state.suppliers]
            const entries = [...state.purchases, ...state.sales, ...state.payables]
            console.log(entries)
            const newData = {
                transactionDate: {date: payment.transactionDate, id: payment._id},
                linkedTo: entries.find(entry => entry._id === payment.linkedTo)
            }
            if (payment.debitFrom) {
                newData.debitFrom = stakeholders.find(stakeholder => stakeholder._id === payment.debitFrom)
            } else {
                newData.creditTo = stakeholders.find(stakeholder => stakeholder._id === payment.creditTo)
            }				
            return {...payment, ...newData}
        }),
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(CashList)