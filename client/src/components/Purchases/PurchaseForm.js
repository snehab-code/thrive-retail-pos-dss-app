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
function PurchaseForm(props) {

    console.log(props)

    const [transactionDate, setDate] = useState(Date.now())
    // const [documentDate, setDocDate] = useState(Date.now())
    const [invoiceDate, setInvDate] = useState(Date.now())
    const [count, setCount] = useState(props.commodities ? Array(props.commodities.length).fill().map((item, i) => i + 1) : ['1'])
    const [supplier, setSupplier] = useState(props.supplier)

    const handleSubmit = (val, {setSubmitting}) => {
        val.commodities = val.commodities.slice(0, count.length)
        const formData = {...val,...{
            supplier: supplier._id,
            transactionDate,
            invoiceDate,
            order: props.orders.find(order => order.orderNumber === props.orderNumber)._id,
            amount: val.commodities.length > 1 ? val.commodities.reduce((acc, currentval) => {
                return acc.rate*acc.quantity + currentval.rate*currentval.quantity
            }) : val.commodities[0].rate*val.commodities[0].quantity
        }}
        props.handleSubmit(formData)
        setSubmitting(false)
    }
    
    return (
        <Formik
            enableReinitialize 
            initialValues={{ 
                order: props.order ? props.order : props.orderNumber ? props.orderNumber : '',
                supplier: props.supplier ? props.supplier._id : '',
                supplierInvoice: props.supplierInvoice ? props.supplierInvoice : '',
                documentType: props.documentType ? props.documentType : '',
                remark: props.remark ? props.remark : '',
                documentNumber: props.documentNumber ? props.documentNumber : '',
                commodities: props.commodities ? props.commodities.map(commodity => ({product: commodity.product._id, rate: commodity.rate, quantity: commodity.quantity})) : Array(10).fill({product: '', rate: '', quantity: ''}),
                amount: props.amount ? props.amount : ''
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
            console.log(values)
            return (
            <Form onSubmit={handleSubmit}>
                <div className="formSubGroup">
                    <KeyboardDatePicker
                        id='transactionDate'
                        name='transactionDate'
                        onChange={(date) => setDate(date)}
                        value={transactionDate}
                        format='MM/DD/YYYY'
                        label='Transaction Date'
                    />
                    <TextField
                        error = {errors.order && touched.order}
                        id='order'
                        name='order'
                        value={values.order}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Order Number'
                        helperText={errors.order}
                    />
                    {/* Invoice date */}
                    <KeyboardDatePicker
                        id='invoiceDate'
                        name='invoiceDate'
                        onChange={(date) => setInvDate(date)}
                        value={invoiceDate}
                        format='MM/DD/YYYY'
                        label='Supplier Invoice Date'
                    />
                </div>
                <div className="formSubGroup">
                    
                    {/* supplier */}
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
                    <div className="dimText">
                        <span>
                            {
                            supplier ? `${supplier.supplierCode}-` : 'CODE-'
                            }
                        </span>
                    </div>
                    <TextField
                        error = {errors.supplierInvoice && touched.supplierInvoice}
                        id='supplierInvoice'
                        name='supplierInvoice'
                        value={values.supplierInvoice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Supplier Invoice'
                        helperText={errors.supplierInvoice}
                    />
                </div>
                <div className="formSubGroup">
                    {/* document date */}
                    {/* <KeyboardDatePicker
                            id='documentDate'
                            name='documentDate'
                            onChange={(date) => setDocDate(date)}
                            value={documentDate}
                            format='MM/DD/YYYY'
                            label='Document Date'
                    /> */}
                    {/* too many dates? merge transaction date and document date */}
                    <FormControl>
                    <InputLabel id="documentType">Document</InputLabel>
                    <Select
                        labelId="documentType"
                        id="documentType"
                        name='documentType'
                        value={values.documentType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Document'
                        // helperText={errors.documentType}
                    >
                        {
                            ['GRN', 'MRN', 'Debit Note', 'Warranty', 'Credit Note'].map((documentType, i) => {
                                return <MenuItem key={i} value={documentType}>{documentType}</MenuItem>
                            })
                        }
                    
                    </Select>
                    </FormControl>
                    <TextField
                        error = {errors.documentNumber && touched.documentNumber}
                        id='documentNumber'
                        name='documentNumber'
                        value={values.documentNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Number'
                        helperText={errors.documentNumber}
                    />
                </div>
                {
                    count.map(ele => {
                    return (
                    <div key={ele} className="formSubGroup" style={{bpurchase: '1px solid #f1f4f3'}}>
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
                    <div className="formCommodityAmount">
                    {
                        values['commodities'][ele-1] && 
                        values['commodities'][ele-1]['quantity'] && 
                        values['commodities'][ele-1]['rate'] &&
                        <>
                        <span>
                            {
                            values['commodities'][ele-1]['quantity'] * values['commodities'][ele-1]['rate']
                            }
                        </span>
                        <button 
                        className="addButton"
                        onClick={() => {
                            const newCount = [...count, (count.length+1)]
                            setCount(newCount)
                        }} 
                        type="button"
                        >
                            +
                        </button>
                        </>
                    }
                    </div>
                </div>
                    )}
                )}
                {
                    values.commodities[1] && values.commodities[1].rate && values.commodities[1].quantity && (
                    <div style={{padding:10, fontSize: '4vmin', width: '90%', height: '60px', textAlign: 'right'}}>
                        <span>
                            {
                                values.commodities.map(commodity => {
                                    if (commodity.rate && commodity.quantity) {
                                        return commodity.rate * commodity.quantity
                                    } else {
                                        return 0
                                    }
                                }).reduce((acc, currentVal) => {
                                    return acc + currentVal
                                })
                            }
                        </span>
                    </div>
                    )
                }
                <div className="formSubGroup">
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
        products: state.commodities,
        orders: state.orders
    }
}

export default connect(mapStateToProps)(PurchaseForm)