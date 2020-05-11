import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'

function ReportList(props) {

    const [focused, setFocused] = useState(null)

    return (
        <div className="businessContentContainer" style={{border: 0}}>
        <div className="businessContent">
            <h1>Reports</h1>
            <div className="reportQueryContainer">
                
                <TextField 
                    onFocus={() => {setFocused('field1')}}
                    onBlur={() => {setFocused(null)}}
                    style={focused==='field1' ? {border: '1px solid #ffc916', transition: '0.5s', borderRadius: '12px', padding: '10px'} : {transition: '0.5s', border: '1px solid #dbe6e3', borderRadius: '12px', padding: '10px'}}
                />
                <span>{'in'}</span>
                <TextField 
                    onFocus={() => {setFocused('field2')}}
                    onBlur={() => {setFocused(null)}}
                    style={focused==='field2' ? {transition: '0.5s', border: '1px solid #ffc916', borderRadius: '12px', padding: '10px'} : {transition: '0.5s', border: '1px solid #dbe6e3', borderRadius: '12px', padding: '10px'}}
                />
                <span>{'to/from'}</span>
                <TextField 
                    onFocus={() => {setFocused('field3')}}
                    onBlur={() => {setFocused(null)}}
                    style={focused==='field3' ? {transition: '0.5s', border: '1px solid #ffc916', borderRadius: '12px', padding: '10px'} : {transition: '0.5s', border: '1px solid #dbe6e3', borderRadius: '12px', padding: '10px'}}
                />
            </div>
        </div>
        </div>
    )
}

export default ReportList