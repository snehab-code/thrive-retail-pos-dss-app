import React, {useState} from 'react'
import {connect} from 'react-redux'
import CommodityAdd from '../Commodities/CommodityAdd'
import Modal from 'react-modal'
import modalStyles from '../../config/modalCss'
import {Formik, Form} from 'formik'
import { KeyboardDatePicker } from '@material-ui/pickers'
import {withStyles} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'

const GreenCheckbox = withStyles({
    root: {
        color: '#6fb98f',
        '&$checked': {
            color: '#2c7873'
        },
        padding: '0px',
        minWidth: '20px',
        minHeight: '20px',
        height: '20px'
    },
    checked: {},
})((props) => <Checkbox color='default' {...props} />)

// validations pending
function PayableForm(props) {

    const [modalIsOpen, setModalState] = useState(false)
    const [transactionDate, setDate] = useState(Date.now())
    const [dueDate, setDueDate] = useState(Date.now())
    const [payableTo, setPayableTo] = useState(props.payableTo)

    Modal.setAppElement('#root')  

    const closeModal = () => {
        setModalState(false)
    }

    const handleSubmit = (val, {setSubmitting}) => {
        const formData = {...val,...{
            payableTo: payableTo._id,
            transactionDate,
            dueDate
        }}
        console.log(formData)
        props.handleSubmit(formData)
        setSubmitting(false)
    }
    

    return (
        <>
        <Modal
            style={modalStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <CommodityAdd businessId={props.businessId} closeModal={closeModal}/>
        </Modal>
        <Formik
            enableReinitialize 
            initialValues={{ 
                payableTo: props.payableTo ? props.payableTo._id : '',
                invoice: props.invoice ? props.invoice : '',
                isPaid: props.isPaid ? props.isPaid : false,
                remark: props.remark ? props.remark : '',
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
                        error = {errors.invoice && touched.invoice}
                        id='invoice'
                        name='invoice'
                        value={values.invoice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Invoice Number'
                        helperText={errors.invoice}
                    />
                    <KeyboardDatePicker
                        id='dueDate'
                        name='dueDate'
                        onChange={(date) => setDueDate(date)}
                        value={dueDate}
                        format='MM/DD/YYYY'
                        label='Due Date'
                    />
                </div>

                <div className="formSubGroup">
                    {
                    <Autocomplete
                    style={{width:'100%'}}
                    options={props.creditors}
                    getOptionLabel={option => option.name ? option.name : ''}
                    name="payableTo" 
                    id="payableToac"
                    disableClearable
                    value={payableTo}
                    onChange={(e, newValue) => setPayableTo(newValue)
                    }
                    renderInput={params => 
                        <TextField {...params} 
                            label="payableTo" 
                            id="payableToac" 
                            value={values.payableTo}
                            onChange={handleChange}
                            margin="normal"
                        />}
                    />
                    }
                    
                    
                    <TextField
                        error = {errors.amount && touched.amount}
                        id='amount'
                        name='amount'
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Amount'
                        helperText={errors.amount}
                    />
                </div>
                
                <div style={{textAlign: 'left', width:'100%', color: '#cbd8d0'}}>
                    <span style={{paddingLeft:5, paddingTop:15, cursor: 'pointer'}} onClick={() => setModalState(true)}>New Creditor?</span>
                </div>

                <div className="formSubGroup">
                    <FormControlLabel 
                        control={
                            <GreenCheckbox 
                                error={errors.isPaid && touched.isPaid}
                                id='isPaid'
                                name='isPaid'
                                checked = {values.isPaid}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        }
                        label="Paid"
                    />
                
                    <TextField
                        error = {errors.remark && touched.remark}
                        id='remark'
                        name='remark'
                        value={values.remark}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Nature of expense'
                        helperText={errors.remark}
                    />
                </div>

                <Button variant="outlined" type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
            )
        }}
        </Formik>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        creditors: state.creditors,
        products: state.commodities
    }
}

export default connect(mapStateToProps)(PayableForm)