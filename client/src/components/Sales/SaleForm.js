import React from 'react'
import {Formik, Form, Field} from 'formik'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

function SaleForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Formik
            initialValues={{teamLink: ''}}
            onSubmit={handleSubmit}
        >
            {
                (props) => {
                    const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props
                    return (
                        <form className='businessForm businessContentForm' onSubmit={handleSubmit}>
                        <h4>{moment().format('DD-MM-YY')}</h4>
                        <TextField
                            id="party"
                            name="party"
                            value={values.party}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        </form>
                    )
                } 
            }
        </Formik>
    )
}

export default SaleForm