import React, {useState} from 'react'
import {connect} from 'react-redux'
// import Modal from 'react-modal'
import {Formik, Form} from 'formik'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'

function CashForm(props) {

    // const [modalIsOpen, setModalState] = useState(false)
    const [transactionDate, setDate] = useState(Date.now())
    const [party, setParty] = useState(props.creditTo ? props.creditTo : props.debitFrom ? props.debitFrom : '')
    const [linkedTo, setLinkedTo] = useState(props.linkedTo ? props.linkedTo : '')

    // Modal.setAppElement('#root')  

    // const closeModal = () => {
    //     setModalState(false)
    // }

    const handleSubmit = (val, {setSubmitting}) => {
        const formData = {...val,...{
            transactionDate
        }}
        console.log(formData)
        props.handleSubmit(formData)
        setSubmitting(false)
    }
    

    return (
        <>
        {/* <Modal
            style={modalStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <CommodityAdd businessId={props.businessId} closeModal={closeModal}/>
        </Modal> */}
        <Formik
            enableReinitialize 
            initialValues={{
                mode: props.mode ? props.mode : '',
                type: props.debitFrom ? 'Receipt' : props.creditTo ? 'Payment' : '',
                remark: props.remark ? props.remark : '',
                amount: props.amount ? props.amount : '',
                party,
                linkedTo
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
            console.log(values, 'values')
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
                    <FormControl>
                    <InputLabel>Mode</InputLabel>
                    <Select
                        error = {errors.mode && touched.mode}
                        id = 'mode'
                        name = 'mode'
                        value = {values.mode}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        label = 'Mode'
                    >
                        {
                            ['Cash', 'Bank'].map(mode => {
                                return <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                            })
                        }
                    </Select>
                    </FormControl>
                    <FormControl>
                    <InputLabel>Type</InputLabel>
                    <Select
                        error = {errors.mode && touched.mode}
                        id = 'type'
                        name = 'type'
                        value = {values.type}
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        label = 'Type'
                    >
                        {
                            ['Payment', 'Receipt'].map(mode => {
                                return <MenuItem key={mode} value={mode}>{mode}</MenuItem>
                            })
                        }
                    </Select>
                    </FormControl>
                </div>

                <div className="formSubGroup">
                    <Autocomplete
                        style={{width:'100%'}}
                        options={props.parties}
                        getOptionLabel={option => option.name ? option.name : ''}
                        name="party" 
                        id="party"
                        disableClearable
                        value={party}
                        onChange={(e, newValue) => setParty(newValue)
                        }
                        renderInput={params => 
                            <TextField {...params} 
                                label="party" 
                                id="party" 
                                value={values.party}
                                onChange={handleChange}
                                margin="normal"
                            />
                        }
                    />
                    <Autocomplete
                        style={{width:'100%'}}
                        options={props.transactions}
                        getOptionLabel={option => option.documentNumber ? option.documentNumber : option.invoiceNumber ? option.invoiceNumber : option.payableTo ? option.invoice : ''}
                        name="linkedTo" 
                        id="linkedTo"
                        disableClearable
                        value={linkedTo}
                        onChange={(e, newValue) => setLinkedTo(newValue)
                        }
                        renderInput={params => 
                            <TextField {...params} 
                                label="linkedTo" 
                                id="linkedTo" 
                                value={values.linkedTo}
                                onChange={handleChange}
                                margin="normal"
                            />
                        }
                    />
                </div>
                
                {/* <div style={{textAlign: 'left', width:'100%', color: '#cbd8d0'}}>
                    <span style={{paddingLeft:5, paddingTop:15, cursor: 'pointer'}} onClick={() => setModalState(true)}>New Creditor?</span>
                </div> */}

                <div className="formSubGroup">
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
                    <TextField
                        error = {errors.remark && touched.remark}
                        id='remark'
                        name='remark'
                        value={values.remark}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Nature of Cash Transaction'
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
        parties: [...state.suppliers, ...state.creditors, ...state.clients],
        transactions: [...state.payables, ...state.sales, ...state.purchases]
    }
}

export default connect(mapStateToProps)(CashForm)