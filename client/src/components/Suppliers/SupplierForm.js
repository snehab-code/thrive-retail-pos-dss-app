import React from 'react'
import {Formik, Form} from 'formik'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function SupplierForm(props) {

    const handleSubmit = (val) => {
        const formData = {}
        for (let key in val) {
            if(val[key]) formData[key] = val[key]
        }
        props.handleSubmit(formData)
    }

    return (
        <Formik
            enableReinitialize
            initialValues = {{
                name: props.name ? props.name : '',
                supplierCode: props.supplierCode ? props.supplierCode : '',
                phone: props.phone ? props.phone : '',
                address: props.address ? props.address : '',
                remarks: props.remarks ? props.remarks : '',
                email: props.email ? props.email : ''
            }}
            onSubmit={handleSubmit}
            validate={values => {
                const errors = {}
                return errors
            }}
        >
        {
            (formikProps) => {
                const { values, errors, handleChange, handleBlur, handleSubmit} = formikProps
                return (
                <Form onSubmit={handleSubmit}>
                    <div className="formSubGroup">
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={values.name}
                        helperText={errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{flexGrow: 1}}
                    />
                    <TextField
                        id="supplierCode"
                        name="supplierCode"
                        label="Supplier Code"
                        value={values.supplierCode}
                        helperText={errors.supplierCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:120}}
                    />
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        helperText={errors.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:50}}
                    /> 
                    </div>
                    <div className="formSubGroup">
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        multiline
                        value={values.address}
                        helperText={errors.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{flexGrow: 1}}
                    />
                    </div>
                    <div className="formSubGroup">
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        helperText={errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        helperText={errors.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    /> 
                    </div>
                    <div className="formSubGroup">
                    <TextField
                        id="remarks"
                        name="remarks"
                        label="Remarks"
                        value={values.remarks}
                        helperText={errors.remarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{flexGrow: 1}}
                    />
                    </div>
                    <Button type="submit">clickie</Button>
                </Form>
                )
            }
        }
        
        </Formik>
    )
}

export default SupplierForm