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
import PaymentShow from './PaymentShow'
import {startDeleteCashBank} from '../../actions/cashBank'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    cell: row => `${moment(row.transactionDate.date).format('MMM DD')}`
},
{
    name: 'Paid To',
    selector: row => row.creditTo ? row.creditTo.name : row.debitFrom ? row.debitFrom.name : '',
    sortable: true
},
{
    name: 'Amount', 
    selector: 'amount',
    center: true
},
// {
//     name: 'Related Document',
//     selector: 'linkedTo.name',
// 	sortable: true
// },
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

function PaymentsList(props) {

	console.log(props.payments)

    const [modalIsOpen, setModalState] = useState(false)
    const [paymentId, setPaymentId] = useState('')

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setPaymentId(row.transactionDate.id)
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
                <PaymentShow id={paymentId} handleRemove={handleRemove}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Payments</span>
            <Link to={`/businesses/${props.match.params.businessId}/payments/new`}><IconButton className='tableButton' >
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
                data={props.payments}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            <div className="businessSubContent">
                <div className="subContentBox thirdbox">
                    <h3>More actions</h3>
                    Payments by period
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Creditors</h3>
                    See a list of your creditors
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
		})
    }
}

export default connect(mapStateToProps)(PaymentsList)