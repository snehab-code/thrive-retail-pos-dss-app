import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {startPostUserLogout} from '../../actions/user'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            drawerIsOpen: false,
            activeBusiness: ''
        }
    }

    toggleDrawer = (open) => {
        console.log('i ran')
        this.setState({drawerIsOpen: open, activeBusiness: this.props.location.pathname.slice(12, 36)})
    }

    render() {
        console.log(this.state)
        return (
        <div className="header">
            
            {this.props.location.pathname.includes('/businesses/') ?
             <>
             <Drawer open={this.state.drawerIsOpen} onClose={() => this.toggleDrawer(false)}>
                <List>
                    
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'expenses'} />
                    </ListItem>
                    
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'exp'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'exp'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'exp'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'exp'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'exp'} />
                    </ListItem>
                </List>
             </Drawer>
             <div className="logo">
                <MenuIcon onClick={() => this.toggleDrawer(true)}/>
                <Link to="/businesses"><h1>THRIVE</h1></Link>
             </div>
             </>
             :
             <div className="logo">
                <Link to="/"><h1>THRIVE</h1></Link>
            </div>
            }
            
            <div className="headerLinks">
                {
                    this.props.user.isLoggedIn ? 
                    <div className="headerLinks">
                    <Link to ="/businesses">Businesses</Link>
                    <Link to ="/user">Settings</Link>
                    <Link to ="/" onClick={() => {this.props.dispatch(startPostUserLogout())}}>Logout</Link>
                    </div>
                    :
                    <div className="headerLinks">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </div>
                }
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Header))