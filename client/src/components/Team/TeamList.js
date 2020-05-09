import React, {useState} from 'react'
import {connect} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { TextField } from '@material-ui/core'
import { startPostCreateInvite } from '../../actions/businesses'
import TeamEdit from './TeamEdit'

function TeamList(props) {

    const [username, setUsername] = useState('')
    const [editMode, setEditMode] = useState(false)

    const handleSubmitInvite = (e) => {
        e.preventDefault()
        const formData = {
            user: username
        }
        props.dispatch(startPostCreateInvite(props.match.params.businessId, formData))
        setUsername('')
    }

    const handleEditMode = () => {
        setEditMode(!editMode)
    }

    return (
        <div className='businessContentContainer' style={{flexDirection:'column'}}>
            <div className='businessContent'>
                <div style={{width:'100%', textAlign:"center", marginTop:'10px'}}>
                    <h1 style={{display:'inline', paddingLeft:'60px'}}>Teams</h1>
                    <div style={{float:'right', height:'40px', width: '60px', color: '#004445', padding: '10px', cursor: 'pointer'}} onClick={handleEditMode}>
                        <EditIcon fontSize='small' style={{margin:5, marginTop: 0}}/>
                    </div>
                </div>
            {
                !editMode ? 
                <div className='cardGrid'>
                    {
                        props.invitations && props.invitations[0] && props.invitations.map(invite => {
                            if (invite.status === 'pending') {
                                return (
                                    <div key={invite._id} className='cardContainer'>
                                        <div className='memberCard'>
                                            {invite.user.email} has not yet accepted your invitation
                                        </div>
                                    </div>
                                )
                            } else {
                                return ('')
                            }
                        })
                    }
                    {
                        props.business && props.business.members && props.business.members.map(member => {
                            return (
                                <div  key={member._id} className='cardContainer'>
                                <div className='memberCard'>
                                    <div className='memberAvatar'>
                                        x
                                    </div>
                                    <div className='memberInfo'>
                                    {
                                        props.permissions.includes('admin') && 
                                    <div className='memberActions'>
                                        <DeleteIcon fontSize='small' style={{margin:5, marginTop: 0}}/>
                                    </div>
                                    }
                                    <span className='memberName'>
                                    Name Here 
                                    </span>
                                    {
                                    member.permissions.map((perm, i) => {
                                        if (perm === 'admin') {
                                            return <span key={i} className='memberPermission' style={{border: '1px solid #ff165c', color: '#ff165c'}}>{perm}</span>
                                        } else {
                                            return <span key={i} className='memberPermission'>{perm}</span>
                                        }
                                    })
                                    }
                                    <br/>
                                    <span>{member.user.name}</span>
                                    <br/>
                                    <span>{member.user.username}</span>
                                    <br/>
                                    <span>{member.user.email}</span>
                                    <br/>
                                    {member.user._id !== props.business.owner && 
                                    <span>
                                        Invited by: {props.business.members.find(member => member.user._id === member.addedBy).user.username}
                                    </span>
                                    }
                                    </div>
                                </div>
                                </div>
                            )
                        })
                    
                    }
                </div>
                :
                <TeamEdit business={props.business} handleEditMode={handleEditMode}/>
            }
            
            </div>
            <div style={{border: '1px solid #dbe6e3', width:'95%', textAlign:'center', borderRadius: '12px', margin:10, cursor:'pointer'}}>
                <h2>Invite a member</h2>
                <form onSubmit={handleSubmitInvite}>
                <TextField
                    label="username/email"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        business: state.user.activeBusiness,
        members: state.user.activeBusiness && state.user.activeBusiness.members && state.user.activeBusiness.members.sort((a,b) => {
            if (a.user.name.toLowerCase() < b.user.name.toLowerCase()) return -1
            if (a.user.name.toLowerCase() > b.user.name.toLowerCase()) return 1
            return 0
        }),
        invitations: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).teamInvitations,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(TeamList)