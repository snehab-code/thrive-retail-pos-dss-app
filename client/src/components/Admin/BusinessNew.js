import React from 'react'
import {Link} from 'react-router-dom'
import {Formik} from 'formik'
import TextField from '@material-ui/core/TextField'

function BusinessNew(props) {

    const handleTeamSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <div className="businessAddContainer box">
                <div className="businessAddBox" style={{borderRight:"2px solid white"}}>
                    <h1><Link to="/businesses/add">Create a New Business</Link></h1>
                </div>
                <div className="businessAddBox" style={{borderLeft:"2px solid white"}}>
                    Join a team
                    <Formik
                        initialValues={{teamLink: ''}}
                        onSubmit={handleTeamSubmit}
                    >
                        {
                            (props) => {
                                const {
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                                } = props
                                return (
                                    <form onSubmit={handleSubmit}>
                                    <TextField
                                        id="teamLink"
                                        name="teamLink"
                                        value={values.teamLink}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    </form>
                                )
                            } 
                        }
                        
                    </Formik>
                    
                    {/* <input type="text" /> */}
                </div>
            </div>
        </>
    )
}

export default BusinessNew