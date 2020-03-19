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
import Autocomplete from '@material-ui/lab/Autocomplete'

// validations pending
function OrderForm(props) {

    const [transactionDate, setDate] = useState(Date.now())
    const [count, setCount] = useState(props.commodities ? Array(props.commodities.length).fill().map((item, i) => i + 1) : ['1'])
    const [supplier, setSupplier] = useState(props.supplier)

    const handleSubmit = (val, {setSubmitting}) => {
        val.commodities = val.commodities.slice(0, count.length)
        const formData = {...val,...{
            supplier: supplier._id,
            transactionDate
        }}
        props.handleSubmit(formData)
        setSubmitting(false)
    }

    
    return (
        <Formik
            enableReinitialize 
            initialValues={{ 
                supplier: props.supplier ? props.supplier._id : '',
                orderNumber: props.orderNumber ? props.orderNumber : '',
                status: props.status ? props.status : '',
                remark: props.remark ? props.remark : '',
                commodities: props.commodities ? props.commodities.map(commodity => ({product: commodity.product._id, rate: commodity.rate, quantity: commodity.quantity})) : Array(10).fill({product: '', rate: '', quantity: ''})
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const errors = {};
                return errors;
              }
            }
        >
        {
        (formikProps) => {
            const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = formikProps
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
                    <Autocomplete
                    style={{width:'100%'}}
                    options={props.suppliers}
                    getOptionLabel={option => option.name}
                    name="supplier" 
                    id="supplierac"
                    disableClearable
                    value={supplier}
                    onChange={(e, newValue) => setSupplier(newValue)
                    }
                    renderInput={params => 
                        <TextField {...params} 
                            label="supplier" 
                            id="supplierac" 
                            value={values.supplier}
                            onChange={handleChange}
                            margin="normal"
                        />}
                    />
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
                    return (
                    <div key={ele} className="formSubGroup" style={{border: '1px solid #f1f4f3'}}>
                    {
                        props.products && 
                        <FormControl>
                        <InputLabel id={`product${ele}`}>Product</InputLabel>
                        <Select
                            error = {errors[`commodities[${ele-1}].product`] && touched[`commodities[${ele-1}].product`]}
                            labelId={`product${ele}`}
                            id={`product${ele}`}
                            name={`commodities[${ele-1}].product`}
                            value={values['commodities'][ele-1] && values['commodities'][ele-1]['product']}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label='Product'
                            // helperText={errors.commodities && errors.commodities[ele-1].product}
                        >
                            {
                                props.products.map(product => {
                                    return <MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>
                                })
                            }
                        
                        </Select>
                        </FormControl>
                    }
                    <TextField
                        error = {errors.rate && touched.rate}
                        id={`rate${ele}`}
                        name={`commodities[${ele-1}].rate`}
                        value={values['commodities'][ele-1] && values['commodities'][ele-1]['rate']}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Rate'
                        placeholder='test'
                        helperText={errors.rate}
                    />
                    <TextField
                        error = {errors.quantity && touched.quantity}
                        id={`quantity${ele}`}
                        name={`commodities[${ele-1}].quantity`}
                        value={values['commodities'][ele-1] && values['commodities'][ele-1]['quantity']}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='quantity'
                        helperText={errors.quantity}
                    />
                    <div style={{padding:10, fontSize: '4vmin', minWidth: '40%', height: '60px', textAlign: 'right'}}>
                        <span>{values['commodities'][ele-1] && values['commodities'][ele-1]['quantity'] && values['commodities'][ele-1]['rate'] && values['commodities'][ele-1]['quantity'] * values['commodities'][ele-1]['rate']}</span>
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
                        // helperText={errors.status}
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
        suppliers: state.suppliers,
        products: state.commodities
    }
}

export default connect(mapStateToProps)(OrderForm)