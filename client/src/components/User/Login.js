import React from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('handle submit')
    }

    render(){
        return (
            <>
              <div className="loginPanel">
                  
                <form onSubmit={this.handleSubmit}>
                  <h3>LOGIN</h3>
                  <TextField size="small" label="username/email"/>
                  <TextField size="small" type="password" label="password"/>
                  <Button 
                    size="small" 
                    type="submit" 
                  >
                    Sign in
                  </Button>
                </form>
                  <div>
                    <Link to="/forgot-password">Forgot Password</Link>
                  </div>
              </div>
              
            </>
        )
    }
}

export default Login