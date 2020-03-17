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

    const [transactionDate, setDate] = useState(Date.now())
    const [count, setCount] = useState(['1'])

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
                remark: '',
                commodities: []
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
                        onChange={(date) => setDate(date)}
                        value={transactionDate}
                        format='MM/DD/YYYY'
                        label='Transaction Date'
                    />

                <div className="formSubGroup">
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
                {
                    count.map(ele => {
                        console.log(ele)
                    return (
                    <div className="formSubGroup" style={{border: '1px solid #f1f4f3'}}>
                    <TextField
                        error = {errors.commoditiesproduct && touched.product}
                        id={`product${ele}`}
                        name={`commodities[${ele-1}].product`}
                        value={values[`commodities[${ele-1}].product`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Product'
                        helperText={errors.commodities && errors.commodities[ele-1].product}
                    />
                    <TextField
                        error = {errors.rateremark && touched.rate}
                        id={`rate${ele}`}
                        name={`commodities[${ele-1}].rate`}
                        value={values[`commodities[${ele-1}].rate`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Rate'
                        helperText={errors.rate}
                    />
                    <TextField
                        error = {errors.quantity && touched.quantity}
                        id={`quantity${ele}`}
                        name={`commodities[${ele-1}].quantity`}
                        value={values[`commodities[${ele-1}].quantity`]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='quantity'
                        helperText={errors.quantity}
                    />
                    <div style={{padding:10, fontSize: '4vmin', minWidth: '40%', height: '60px', textAlign: 'right'}}>
                        <span>{values.quantity && values.rate && values.quantity * values.rate}</span>
                    </div>
                    <button onClick={() => {
                        const newCount = [...count, (count.length+1)]
                        setCount(newCount)
                    }} style={{width:20}} type="button">+</button>
                </div>
                    )}
                )}
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