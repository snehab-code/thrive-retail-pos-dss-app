import React, {useState} from 'react'
import RoleForm from './RoleForm'
import {connect} from 'react-redux'
import { startPutBusiness } from '../../actions/businesses'

function TeamEdit(props) {

	const [memberRoles, setMemberRoles] = useState([])

	const onSelect = (roleData) => {
		console.log(roleData, memberRoles)
		const newMemberRoles = memberRoles.filter(member => member.id !== roleData.id)
		newMemberRoles.push(roleData)

		setMemberRoles(newMemberRoles)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const memberData = memberRoles.map(member => {
			const roles = []
			member.admin && roles.push('admin')
			member.view && roles.push('view')
			member.create && roles.push('create') 
			member.update && roles.push('update')
			return {
				_id: member.id,
				permissions: roles,
			}
		})
		const formData= {
			members : props.business.members.map(member => {
			const newData = memberData.find(newMembers => newMembers._id === member._id)
			return {...member, ...newData, ...{user: member.user._id}}
			})
		}
		props.dispatch(startPutBusiness(props.business._id, formData))
		props.handleEditMode()
	}

	return (
		<div style={{border: '1px solid #dbf0f0', width:'95%', textAlign:'center', borderRadius: '12px', margin:10}}>
			<h3>Edit mode</h3>
			<form onSubmit={handleSubmit}>
			<div style={{width:'95%', margin:10, display:'flex', fontSize:'0.8em', color: '#2c7873'}}>
				<div style={{textAlign:'center', width:'50%'}}>
					Member info
				</div>
				<div style={{display: 'flex'}}>
					<span style={{margin:'5px'}}>Admin</span>
					<span style={{margin:'5px'}}>View</span>
					<span style={{margin:'5px'}}>Create</span>
					<span style={{margin:'5px'}}>Update</span>
				</div>
			</div>
			{
				props.business && props.business.members && props.business.members.map(member => {
					return (
						<div key={member._id} style={{border: '1px solid #edf7f7', width:'95%', borderRadius: '12px', margin:10, display:'flex'}}>
							<div style={{textAlign:'center', width:'50%'}}>
								{member.user.username}
								<br/>
								<span style={{fontSize: '0.8em'}}>{member.user.email}</span>
							</div>
							<div>
								<RoleForm permissions={member.permissions} onSelect={onSelect} memberId={member._id}/>
							</div>
						</div>
					)
				})
			}
			<button type='submit'>Submit</button>
			</form>
		</div>
	)
}

export default connect()(TeamEdit)