import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Formik, Form} from 'formik'
import { KeyboardDatePicker } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'


function OrderForm(props) {

    const [transactionDate, handleDateChange] = useState(Date.now())

    const handleSubmit = (val, {setSubmitting}) => {
        console.log('hi', val, transactionDate)
    }

    const suppliers = props.suppliers
    console.log(props.suppliers, 'hihi')
    return (
        <Formik
            initialValues={{
                supplier: '', 
                phone: '',
                orderNumber: '',
                status: '',
                remark: ''
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const errors = {};
                return errors;
              }
            }
        >
        {
        (props) => {
            const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = props
            return (
            <Form onSubmit={handleSubmit}>
                <KeyboardDatePicker
                        id='transactionDate'
                        name='transactionDate'
                        onChange={handleDateChange}
                        value={transactionDate}
                        format='MM/DD/YYYY'
                        label='Transaction Date'
                    />

                <div className="formSubGroup">
                    {/* <TextField
                        error = {errors.supplier && touched.supplier}
                        id='supplier'
                        name='supplier'
                        value={values.supplier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='supplier'
                        helperText={errors.supplier}
                    /> */}
                    
                    {
                        suppliers[0] && 
                        <FormControl>
                        <InputLabel id="supplier">Supplier</InputLabel>
                        <Select
                            labelId="supplier"
                            id="supplier"
                            name='supplier'
                            value={values.supplier}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='supplier'
                            helperText={errors.supplier}
                        >
                            {
                                suppliers.map(supplier => {
                                    return <MenuItem key={supplier._id} value={supplier._id}>{supplier.name}</MenuItem>
                                })
                            }
                        
                        </Select>
                        </FormControl>
                    }
                    
                    <TextField
                        error = {errors.orderNumber && touched.orderNumber}
                        id='orderNumber'
                        name='orderNumber'
                        value={values.orderNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='order Number'
                        helperText={errors.orderNumber}
                    />
                </div>
                <div className="formSubGroup">
                    <FormControl>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        name='status'
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='status'
                        helperText={errors.status}
                    >
                        {
                            ['Pending Delivery', 'Delivered', 'Completed'].map((status, i) => {
                                return <MenuItem key={i} value={status}>{status}</MenuItem>
                            })
                        }
                    
                    </Select>
                    </FormControl>
                    <TextField
                        error = {errors.remark && touched.remark}
                        id='remark'
                        name='remark'
                        value={values.remark}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Note'
                        helperText={errors.remark}
                    />
                </div>
                <Button variant="outlined" type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
            )
        }}
        </Formik>
    )
}

const mapStateToProps = (state) => {
    return {
        suppliers: state.suppliers
    }
}

export default connect(mapStateToProps)(OrderForm)