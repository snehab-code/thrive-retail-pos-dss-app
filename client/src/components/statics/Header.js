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
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StorefrontIcon from '@material-ui/icons/Storefront'
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PeopleIcon from '@material-ui/icons/People';

class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            drawerIsOpen: false,
            activeBusiness: ''
        }
    }

    toggleDrawer = (open) => {
        this.setState({drawerIsOpen: open, activeBusiness: this.props.location.pathname.slice(12, 36)})
    }

    render() {
        return (
        <div className="header">
            
            {this.props.location.pathname.includes('/businesses/') ?
             <>
             <Drawer open={this.state.drawerIsOpen} onClose={() => this.toggleDrawer(false)}>
                <List>

                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'Business'} />
                    </ListItem>
                    
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon><StorefrontIcon/></ListItemIcon>
                        <ListItemText primary={'Sales'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ShoppingBasketIcon/></ListItemIcon>
                        <ListItemText primary={'Purchases'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>
                        <ListItemText primary={'Expenses'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><ShowChartIcon/></ListItemIcon>
                        <ListItemText primary={'Reports'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PeopleIcon/></ListItemIcon>
                        <ListItemText primary={'Team'} />
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