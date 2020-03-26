import React from 'react'
import {connect} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

function TeamList(props) {

    return (
        <div className="businessContentContainer">
            <div className="businessContent">
            <h1>Teams</h1>
            <div className="cardGrid">
            {
                props.business && props.business.members && props.business.members.map(member => {
                    return (
                        <div  key={member._id} className="cardContainer">
                        <div className="memberCard">
                            <div className="memberAvatar">
                                x
                            </div>
                            <div className="memberInfo">
                            {
                                props.permissions.includes('admin') && 
                            <div className="memberActions">
                                <EditIcon fontSize="small" style={{margin:5, marginTop: 0}}/>
                                <DeleteIcon fontSize="small" style={{margin:5, marginTop: 0}}/>
                            </div>
                            }
                            <span className="memberName">
                            Name Here 
                            </span>
                            {
                            member.permissions.map((perm, i) => {
                                if (perm === 'admin') {
                                    return <span key={i} className="memberPermission" style={{border: '1px solid #ff165c', color: '#ff165c'}}>{perm}</span>
                                } else {
                                    return <span key={i} className="memberPermission">{perm}</span>
                                }
                            })
                            }
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
            - Invite a member to your team
            - manage roles and permissions 
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        business: state.user.activeBusiness,
        permissions: state.businesses[0] && state.businesses.find(business => business._id === state.user.activeBusiness._id).permissions
    }
}

export default connect(mapStateToProps)(TeamList)