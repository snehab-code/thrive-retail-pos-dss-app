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
import {startDeleteSale} from '../../actions/sales'

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
    selector: 'invoiceNumber',
    sortable: true,
    width:'75px'
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
    name: 'Total', 
    selector: 'amount',
    minWidth: '50px',
    maxWidth:'70px',
    right: true,
},
{
    name: 'Client',
    selector: 'client.name',
    sortable: true,
    maxWidth: '80px',
    minWidth: '80px'
},
{
    name: 'Note',
    selector: 'remark', 
    maxWidth: '100px',
    minWidth: '80px'
}
]

function SalesList(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [saleId, setSaleId] = useState('')

    Modal.setAppElement('#root')  

    const handleRowClicked = (row) => {
        setSaleId(row.transactionDate.id)
        setModalState(true)
    }

    const handleRemove = (id) => {
        props.dispatch(startDeleteSale(props.match.params.businessId, id))
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
                <SaleShow id={saleId} handleRemove={handleRemove}/>
            </Modal>
            <div className='contentHeader'>
            <span className='headerText'>Sales</span>
            {
                props.permissions && (props.permissions.includes('admin') || props.permissions.includes('create')) && 
                <Link to={`/businesses/${props.match.params.businessId}/invoices/new`}><IconButton className='tableButton' >
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
                data={props.sales}
                customStyles={customStylesTable}
                onRowClicked={handleRowClicked}
            />
            <div className="businessSubContent">
                <div className="subContentBox thirdbox">
                    <h3>More actions</h3>
                    <Link to={`/businesses/${props.match.params.businessId}/products`}>See and edit your product catalogue</Link>
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Total Sales by period</h3>
                    x
                </div>
                <div className="subContentBox thirdbox">
                    <h3>Things</h3>
                    x
                </div>
            </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sales: state.sales.map(sale => {
            const commodities = sale.commodities.map(commodity => {
                const computedData = {
                    amount: commodity.quantity * commodity.rate
                }
                return {...commodity, ...computedData}
            })
            const newData = {
                transactionDate: {
                    date: sale.transactionDate, 
                    id: sale._id
                },
                commodities
            }
            return {...sale, ...newData}
        }),
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(SalesList)