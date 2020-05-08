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
                code: props.code ? props.code : '',
                brand: props.brand ? props.brand : '',
                category: props.category ? props.category : '',
                gstRate: props.gstRate ? props.gstRate : '',
                reorderPoint: props.reorderPoint ? props.reorderPoint : '',
                sellingPrice: props.sellingPrice ? props.sellingPrice : '',
                unit: props.unit ? props.unit : '',
                stock: props.stock ? props.stock : ''
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
                        id="code"
                        name="code"
                        label="Code"
                        value={values.code}
                        helperText={errors.code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:60}}
                    />
                    <TextField
                        id="gstRate"
                        name="gstRate"
                        label="GST"
                        value={values.gstRate}
                        helperText={errors.gstRate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:50}}
                    /> 
                    <span className="dimText" style={{paddingBottom:10, paddingLeft:0}}>%</span>
                    </div>
                    <div className="formSubGroup">
                    <TextField
                        id="category"
                        name="category"
                        label="Category"
                        value={values.category}
                        helperText={errors.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{flexGrow: 1}}
                    />
                    <TextField
                        id="brand"
                        name="brand"
                        label="Brand"
                        value={values.brand}
                        helperText={errors.brand}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{flexGrow: 1}}
                    />
                    <TextField
                        id="unit"
                        name="unit"
                        label="Unit"
                        value={values.unit}
                        helperText={errors.unit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{maxWidth:100}}
                    />
                    </div>
                    <div className="formSubGroup">
                        <TextField
                            id="sellingPrice"
                            name="sellingPrice"
                            label="Selling Price"
                            value={values.sellingPrice}
                            helperText={errors.sellingPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            id="reorderPoint"
                            name="reorderPoint"
                            label="Reorder Point"
                            value={values.reorderPoint}
                            helperText={errors.reorderPoint}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField
                            id="stock"
                            name="stock"
                            label="Stock"
                            value={values.stock}
                            helperText={errors.stock}
                            onChange={handleChange}
                            onBlur={handleBlur}
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