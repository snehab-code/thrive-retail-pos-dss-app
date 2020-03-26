import React from 'react'
import {connect} from 'react-redux'
import { Formik, Form} from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {startPostBusiness} from '../../actions/businesses'

function BusinessForm(props) {

    const handleSubmit = (val, {setSubmitting}) => {
        props.dispatch(startPostBusiness(val))
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={{name: '', address: '', phone: ''}}
            onSubmit={handleSubmit}
            validate={values => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Required';
                } else if (!values.address) {
                    errors.address = 'Required'
                } else if (!values.phone) {
                    errors.phone = 'Required'
                }
                return errors;
              }}
        >
            {
                (props) => {
                    const {
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props
                    return (
                        <Form className="businessForm" onSubmit={handleSubmit}>
                        <TextField
                            error = {errors.name && touched.name}
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="name"
                            helperText={errors.name}
                        />
                        <TextField
                            error = {errors.address && touched.address}
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="address"
                            helperText={errors.address && errors.address}
                        />
                        <TextField
                            error = {errors.phone && touched.phone}
                            id="phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="phone"
                            helperText={errors.phone && errors.phone}
                        />
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )
                } 
            }
        </Formik>
    )
}

export default connect()(BusinessForm)