import React from 'react'
import TextField from '@material-ui/core/TextField'

function ReportList(props) {

    return (
        <>
            <h1>Reports</h1>
            <TextField 
                style={{border: '1px solid #dbe6e3', borderRadius: '12px', width: '50%', padding: '10px'}}
            />
        </>
    )
}

export default ReportList