import React from 'react'
import {IoIosChatboxes} from 'react-icons/io'
import {Dropdown, Image} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import firebase from '../../../firebase'

function UserPanel() {
    const user = useSelector(state => state.user.currentUser)
    
    const handleLogout = ()=>{
        firebase.auth().signOut();
    }

    return (
        <div>
            {/* Logo */}

            <h3 style={{ color: 'white'}}>
                <IoIosChatboxes />{" "} Chat App
            </h3>
            <div style={{ display : 'flex', marginBottom: '1rem'}}>
                <Image src={user && user.photoURL} style={{width: '30p', height: '30px', marginTop: '3px'}} roundedCircle />
                <Dropdown>
                    <Dropdown.Toggle style={{background: 'transparent', border:'0px'}} variant="success" id="dropdown-basic">
                        {user && user.displayName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">프로필 사진 변경</Dropdown.Item>
                        
                        <Dropdown.Item onClick={handleLogout}>로그 아웃</Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>

            </div>



            

        </div>
    )
}

export default UserPanel
