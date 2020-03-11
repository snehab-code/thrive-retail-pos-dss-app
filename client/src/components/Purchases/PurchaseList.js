import React, {useState} from 'react'
import DataTable from 'react-data-table-component'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'

const dataColumns = [{
    name: 'Title',
    selector: 'title',
    sortable: true,
    grow: 4,
    cell: row => `${row.title.title}`,
},
{
    name: 'Description',
    selector: 'description',
    grow: 2
},
{
    name: 'Date',
    selector: 'agendaDate',
    sortable: true,
    cell: row => `${(row.agendaDate).format('ddd, MMM DD')}`,
    grow: 2
},
{
    name: 'OTP',
    selector: 'otp',
    center: true
},
// {
//     name: 'Available',
//     selector: 'isAvailable',
//     cell: row => row.isAvailable ? <CheckIcon size="small" color="secondary" /> : <ClearIcon size="small" />,
//     center: true
// },
// {
//     name: 'Viewable',
//     selector: 'isViewable',
//     cell: row => row.isViewable ? <CheckIcon size="small" color="secondary" /> : <ClearIcon size="small" />,
//     center: true
// }
]

function PurchaseList(props) {

    const [columns] = useState(dataColumns)

    const handleAdd = () => {
        console.log('whoop')
    }

    return (
        <>
            <h1>Purchases</h1>
            - add a Supplier
            <Button>Add Supplier</Button>
            - add GRNs on receiving goods ie write to transactions
            <Button>Material Received</Button>
            <DataTable
                title="Purchase Orders"
                highlightOnHover
                actions={(
                    // add a purchase order
                    <IconButton
                    color="secondary"
                    onClick={handleAdd}
                    >
                    <Add />
                    </IconButton>
                )}
                columns={columns}
                // data={this.props.listAgendas}
                // onRowClicked={this.handleRowClicked}
            />
        </>
    )
}

{
    
}

export default PurchaseList