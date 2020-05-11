import React from 'react'
import {Formik, Form} from 'formik'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function ClientForm(props) {

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
                clientCode: props.clientCode ? props.clientCode : '',
                phone: props.phone ? props.phone : '',
                address: props.address ? props.address : ''
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
                        id="clientCode"
                        name="clientCode"
                        label="Client Code"
                        value={values.clientCode}
                        helperText={errors.clientCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:90}}
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
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        helperText={errors.phone}
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

export default ClientForm