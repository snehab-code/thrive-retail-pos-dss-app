import React from 'react'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { startPostUserRegistration } from '../../actions/user'
import {connect} from 'react-redux'

class Register extends React.Component {

    constructor() {
      super() 
      this.state = {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: ''
      }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone
        }
        this.props.dispatch(startPostUserRegistration(formData, this.props.history))
    }

    render(){
        return (
            <>
              <div className="loginPanel">
                  
                <form onSubmit={this.handleSubmit}>
                  <h3>Register</h3>
                  <TextField size="small" name="name" value={this.state.name} onChange={this.handleChange} label="name"/>
                  <TextField size="small" name="username" value={this.state.username} onChange={this.handleChange} label="username"/>
                  <TextField size="small" name="email" value={this.state.email} onChange={this.handleChange} label="email"/>
                  <TextField size="small" name="phone" value={this.state.phone} onChange={this.handleChange} label="phone"/>
                  <TextField type="password" size="small" name="password" value={this.state.password} onChange={this.handleChange} label="password"/>
                  <Button 
                    size="small" 
                    type="submit" 
                  >
                    Sign up
                  </Button>
                </form>
                  <div>
                    <Link to="/login">Already a member? Sign in.</Link>
                  </div>
              </div>
              
            </>
        )
    }
}

export default connect()(Register)