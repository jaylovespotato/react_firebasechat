import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import {FaRegSmileWink} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'
import { connect } from 'react-redux'
import firebase from '../../../firebase'

export class ChatRoom extends Component {

    state = {
        show: false,
        name:"",
        describtion:"",
        chatRoomRef: firebase.database().ref("chatRooms"),
        chatRooms:[],
    }

    componentDidMount(){
        this.AddChatRoomsListeners();
    }

    AddChatRoomsListeners =() =>{
        let chatRoomsArray = [];
        // chat room에 데이터가 들어올 때(즉 채팅룸 생성), datasnapshot 안에 listen 한 게 들어오고
        this.state.chatRoomRef.on("child_added", DataSnapshot =>{
            // 그거를 다시 chatRoomArray에 넣음
            chatRoomsArray.push(DataSnapshot.val());
            console.log("chatRoomsArray", chatRoomsArray)
            this.setState({chatRooms: chatRoomsArray})
        })
    }

    handleClose = () =>{
        this.setState({show:false})
    }

    handleShow = () =>{
        this.setState({show:true})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const {name, description} = this.state;

        //유효성 체크
        if(this.isFormValid(name,description)){
            //그냥 name이랑 des가 있기만하면 유효하다고 하자.
            this.addChatRoom();
        }
    }

    isFormValid = (name, description)=>
        name && description;


    renderChatRooms = (chatRoom) =>
        chatRoom.length >0 &&

        chatRoom.map(room=>(
            <li key={room.id}>
                # {room.name}
            </li>
        ))
    


    addChatRoom = async ()=>{
        // push를 하면 자동으로 key 생성.
        const key = this.state.chatRoomRef.push().key;

        const { name, description } = this.state;
        // 원래는 useSelector를 쓰겠지만.. class 니까 connect를 쓴다.
        const { user } = this.props;
        const newChatRoom = {
            id: key,
            name: name,
            description: description,
            createdBy:{
                name: user.displayName,
                image: user.photoURL
            }
        }

        try {
            console.log("user는 말이야", user)
            await this.state.chatRoomRef.child(key).update(newChatRoom)
            this.setState({
                name:"",
                description:"",
                show:false
            })
        } catch (error) {
            alert(error)
        }
        
    }


    render() {
        return (

                <div>
                    <div style={{
                        position: 'relative', width: '100%',
                        display: 'flex', alignItems: 'center'
                    }}>
                        <FaRegSmileWink style={{
                            marginRight: 3
                        }}
                        />
                        CHAT ROOM {" "}(1)
                        <FaPlus style={{
                            position: 'absolute',
                            right:0, cursor: 'pointer'
                            
                        }}  
                        onClick={this.handleShow}  
                        />
                    </div>

                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {this.renderChatRooms(this.state.chatRooms)}
                    </ul>
            
                    {/*  Add Modal */}
                    <div>            
                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a chat room</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>방 이름</Form.Label>
                                        <Form.Control 
                                        onChange={(e)=>this.setState({name: e.target.value})}
                                        type="text" placeholder="Enter a chat room name" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>방 설명</Form.Label>
                                        <Form.Control
                                        onChange={(e)=>this.setState({description: e.target.value})}
                                        type="text" placeholder="Enter a chat room description" />
                                    </Form.Group>
                                </Form>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.handleSubmit}>
                                    Create
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                )
            }
    }

const mapStateToProps = state =>{
    return {
        user: state.user.currentUser,
    }
}

// chatroom 안에서 user 정보가 있는 props를 이용해서 쓸 수 있음
export default connect(mapStateToProps)(ChatRoom)


