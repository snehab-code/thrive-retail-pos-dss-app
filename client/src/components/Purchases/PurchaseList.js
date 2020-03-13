import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import DataTable from 'react-data-table-component'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import moment from 'moment'
import { customStylesTable } from '../../config/dataTableTheme'

const dataColumns = [{
    name: 'Date',
    selector: 'transactionDate',
    sortable: true,
    cell: row => `${moment(row.date).format('ddd, MMM DD')}`
    // cell: row => `${row.date}`,
},
{
    name: 'Item',
    selector: 'commodity.name',
    grow: 2
},
{
    name: 'Supplier',
    selector: 'supplier.name'
},
{
    name: 'Status',
    selector: 'status',
    center: true
},
{
    name: 'Quantity',
    selector: 'qty'
}
]

function PurchaseList(props) {

    const handleAdd = () => {
        console.log('whoop')
    }

    return (
        <>
            <h1>Purchases</h1>
            <DataTable
                title="Purchase Orders"
                highlightOnHover
                theme = "green"
                actions={(
                    // add a purchase order
                    <IconButton className='tableButton'
                    onClick={handleAdd}
                    >
                    <Add />
                    </IconButton>
                )}
                columns={dataColumns}
                data={props.orders}
                customStyles={customStylesTable}
                // onRowClicked={this.handleRowClicked}
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
        orders: state.purchaseOrders.map(order => {
            order.amount = order.quantity * order.rate
            order.qty = order.quantity + ' ' + order.unit 
            return order
        })
    }
}

export default connect(mapStateToProps)(PurchaseList)