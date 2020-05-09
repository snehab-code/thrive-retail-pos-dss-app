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
import PayableShow from './PayableShow'
import {startDeletePayable} from '../../actions/payables'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    cell: row => `${moment(row.transactionDate.date).format('MMM DD')}`
},
{
    name: 'Invoice',
    selector: 'invoice',
    sortable: true
},
{
    name: 'Pay to',
    selector: 'payableTo.name',
    sortable: true,
    grow:2
},
{
    name: 'Amount', 
    selector: 'amount',
    center: true
},
{
    name: 'pending',
    selector: 'balance',
    center: true,
    cell: row => {
        // const transactions = props.cashBank.filter(trn => trn.linkedTo === row._id)
        // const balance = transactions.reduce((acc, currentVal) => {
        //     if (currentVal.creditTo) {
        //         return acc - currentVal.amount
        //     } else {
        //         return acc + currentVal.amount
        //     }
        // }, row.amount)
        return row.balance > 0 ? <span style={{color: 'red'}}>{row.balance}</span> : <span style={{color: 'green'}}>{row.balance}</span>
    }
},
{
    name: 'Notes',
    selector: 'remark',
    center: true,
    sortable: true
},
{
    name: 'Due',
    selector: 'dueDate',
    sortable: true,
    cell: row => `${moment(row.dueDate.date).format('MMM DD')}`
},
{
    name: 'Status',
    selector: 'isPaid',
    center: true,
    sortable: true,
    cell: row => row.isPaid ? 'paid' : 'pending'
}
]

function PayablesList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [payableData, setPayableData] = useState({})

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setPayableData({id: row.transactionDate.id, pending: row.balance})
        setModalState(true)
    }

    const handleRemove = (id) => {
        props.dispatch(startDeletePayable(props.match.params.businessId, id))
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
                <PayableShow {...payableData} handleRemove={handleRemove}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Expenses</span>
            {
                props.permissions && (props.permissions.includes('admin') || props.permissions.includes('create')) &&  
                <Link to={`/businesses/${props.match.params.businessId}/expenses/new`}><IconButton className='tableButton' >
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
                data={props.payables}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            {/* A way to add miscellaneous creditors */}
            <div className="businessSubContent">
                <div className="subContentBox thirdbox">
                    <h3>More actions</h3>
                    Payables by period
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Creditors</h3>
                    <Link to={`/businesses/${props.match.params.businessId}/creditors`}>See a list of your creditors</Link>
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
        payables: state.payables.map(payable => {
            const transactions = state.cashBank.filter(trn => trn.linkedTo === payable._id)
            const balance = transactions.reduce((acc, currentVal) => {
                if (currentVal.creditTo) {
                    return acc - currentVal.amount
                } else {
                    return acc + currentVal.amount
                }
            }, payable.amount)
            const newData = {
                transactionDate: {date: payable.transactionDate, id: payable._id},
                balance
            }
            return {...payable, ...newData}
        }),
        cashBank: state.cashBank,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(PayablesList)