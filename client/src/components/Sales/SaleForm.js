import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Formik, Form} from 'formik'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import { KeyboardDatePicker } from '@material-ui/pickers'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import ClientAdd from '../Clients/ClientAdd'

function SaleForm(props) {
// modify to allow invoice date and transaction date to be set to today as a default option
    const [transactionDate, setTransactionDate] = useState(Date.now())
    const [invoiceDate, setInvoiceDate] = useState(Date.now())
    const [count, setCount] = useState(props.commodities ? Array(props.commodities.length).fill().map((item, i) => i + 1) : ['1'])
    const [client, setClient] = useState(props.client)
    const [modalIsOpen, setModalState] = useState(false)

    Modal.setAppElement('#root')  

    const closeModal = () => {
        setModalState(false)
    }

    console.log(props)

    const handleSubmit = (val, {setSubmitting}) => {
        val.commodities = val.commodities.slice(0, count.length)
        const formData = {...val,...{
            client: client._id,
            transactionDate,
            invoiceDate,
            amount: val.commodities.length > 1 ? val.commodities.reduce((acc, currentval) => {
                return acc.rate*acc.quantity + currentval.rate*currentval.quantity
            }) : val.commodities[0].rate*val.commodities[0].quantity
        }}
        props.handleSubmit(formData)
        // console.log(formData)
        setSubmitting(false)
    }

    return (
        <>
        <Modal
            style={modalStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <ClientAdd businessId={props.businessId} closeModal={closeModal}/>
        </Modal>
        <Formik
            enableReinitialize 
            initialValues={{
                transactionDate: props.transactionDate ? props.transactionDate : '',
                invoiceDate: props.invoiceDate ? props.invoiceDate : '',
                invoiceNumber: props.invoiceNumber ? props.invoiceNumber : '',
                client: props.client ? props.client._id : '',
                amount: props.amount ? props.amount : '',
                remark: props.remark ? props.remark : '',
                commodities: props.commodities ? 
                    props.commodities.map(commodity => ({
                        product: commodity.product._id, 
                        rate: commodity.rate, 
                        quantity: commodity.quantity
                    }))
                    : 
                    Array(10).fill({product: '', rate: '', quantity: ''})
            }}
            onSubmit={handleSubmit}
            validate = {values => {
                const errors = {}
                if (!transactionDate) {
                    errors.transactionDate = 'Required'
                }
                if (!invoiceDate) {
                    errors.invoiceDate = 'Required'
                }
                if (!client) {
                    errors.client = 'Required'
                }
                if (!values.invoiceNumber) {
                    errors.invoiceNumber = 'Required'
                }
                if (!values.remark) {
                    errors.remark = 'required'
                }
                if (!(values.commodities[0].rate*values.commodities[0].quantity)) {
                   errors.amount = 'No products added' 
                }
                // console.log('errors', errors)
                return errors
            }}
        >
            {
                (formikProps) => {
                    const {
                        values, 
                        errors, 
                        touched, 
                        isSubmitting, 
                        handleChange, 
                        handleBlur, 
                        handleSubmit
                    } = formikProps
                    return (
                        <Form onSubmit={handleSubmit}>
                        
                        <div className="formSubGroup">
                            <KeyboardDatePicker
                                error = {errors.transactionDate && true}
                                id='transactionDate'
                                name='transactionDate'
                                onChange={(date) => setTransactionDate(date)}
                                value={transactionDate}
                                format='MM/DD/YYYY'
                                label={'Transaction Date'}
                                helperText={errors.transactionDate}
                            />
                            <KeyboardDatePicker
                                error = {errors.invoiceDate && true}
                                id='invoiceDate'
                                name='invoiceDate'
                                onChange={(date) => setInvoiceDate(date)}
                                value={invoiceDate}
                                format='MM/DD/YYYY'
                                label='Invoice Date'
                                helperText={errors.invoiceDate}
                            />
                        </div>
                        <div className="formSubGroup">
                            <Autocomplete
                            style={{width:'100%'}}
                            options={props.clients}
                            getOptionLabel={option => option.name ? option.name : ''}
                            name="client" 
                            id="clientac"
                            disableClearable
                            value={client || ''}
                            onChange={(e, newValue) => setClient(newValue)
                            }
                            renderInput={params => 
                                <TextField {...params} 
                                    error = {errors.client && true}
                                    label="client" 
                                    id="clientac" 
                                    value={values.client}
                                    onChange={handleChange}
                                    margin="normal"
                                    helperText={errors.client}
                                />}
                            />
                            <TextField
                                error = {errors.invoiceNumber && true}
                                id='invoiceNumber'
                                name='invoiceNumber'
                                value={values.invoiceNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label='invoice Number'
                                placeholder={props.sales[0] && props.sales.sort((a, b) => {
                                    if (a.invoiceNumber < b.invoiceNumber) return 1
                                    if (b.invoiceNumber < a.invoiceNumber) return -1
                                })[0].invoiceNumber + ' is prev invoice'}
                                helperText={errors.invoiceNumber}
                            />
                        </div>
                        <div style={{textAlign: 'left', width:'100%', color: '#cbd8d0'}}>
                            <span style={{paddingLeft:5, paddingTop:15, cursor: 'pointer'}} onClick={() => setModalState(true)}>New Client?</span>
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
                        {errors.amount && <span style={{color: 'red', fontSize: '0.8em', width:'100%', textAlign:'left'}}>{errors.amount}</span>}
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
                } 
            }
        </Formik>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients,
        products: state.commodities,
        sales: state.sales
    }
}

export default connect(mapStateToProps)(SaleForm)