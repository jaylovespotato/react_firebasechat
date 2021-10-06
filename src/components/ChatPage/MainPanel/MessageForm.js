import React, { useRef, useState } from 'react'
import { Button, Col, Form, ProgressBar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import firebase from "../../../firebase"
import ChatRoom from '../SidePanel/ChatRoom'
import mime from 'mime-types';

function MessageForm() {

    const [content, setContent] = useState()
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const [percentage, setPercentage] = useState(0)

    const chatRoom = useSelector(state => state.chatRoom.currentChatRoom)
    const user = useSelector(state => state.user.currentUser)

    const messagesRef = firebase.database().ref("messages")
    const inputOpenImageRef = useRef();

    const createMessage = (fileURL = null) =>{
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
                id:user.uid,
                name: user.displayName,
                image: user.photoURL
            }
        }

        if(fileURL !== null){
            message["image"] = fileURL;
        }else{
            message["content"] = content;

        }
        return message;
    }

    const handleChange = (e)=>{
        setContent(e.target.value);
    }

    const handleSubmit = async () =>{
            if(!content){
                setErrors(prev =>prev.concat("Type Contents First"));
                return;
            }

            setLoading(true);
            //firebase에 메시지를 저장하는 부분
            try {
                await messagesRef
                .child(chatRoom.id)
                .push()
                .set(createMessage())

                setLoading(false)
                setContent("")
                setErrors([])

            } catch (error) {
                setErrors(prev => prev.concat(error.message))
                setLoading(false)
                setTimeout(() => {
                    setErrors([])
                }, 5000);
            }
            
    }

    const handleOpenImageRef = () =>{
        inputOpenImageRef.current.click()
    }

    const handleUploadImage = (e)=>{
        const file = e.target.files[0]
        
        if(!file) return;
        const filePath = `message/public/${file.name}`
        const metadata = {contentType: mime.lookup(file.name)};
        setLoading(true)

        try {
            // 파일을 먼저 스토리지에 저장
            let uploadTask = firebase.storage().ref().child(filePath).put(file, metadata)

            // 저장되는 파일의 퍼센티지 구하기
            uploadTask.on(
                "state_chaged",
                
                UploadTaskSnapshot =>{
                const percentageImg = Math.round(
                    (UploadTaskSnapshot.bytesTransferred / UploadTaskSnapshot.totalBytes)*100
                )
                setPercentage(percentageImg)
                console.log("percentageImg", percentageImg)
                },
                
                err => {
                console.log(err);
                setLoading(false)
                },
            
                ()=>{
                //저장이 다 된 후에 파일 메시지 전송 (DB에 저장)
                //        //스토리지로부터 저장된 파일을 다운로드 할 수 있는 URL 가져오기
                uploadTask.snapshot.ref.getDownloadURL()
                .then(downloadURL =>{
                    console.log("downloadURL", downloadURL)
                    messagesRef.child(chatRoom.id).push().set(createMessage(downloadURL))
                    setLoading(false)
                })
                }
            )
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <Form onSubmit = {handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control 
                    value={content}
                    onChange = {handleChange}
                    as="textarea" rows={3} />
                </Form.Group>
            </Form>

            {
                !(percentage === 0 || percentage === 100)&&
                <ProgressBar variant="warning" label={`${percentage}%`} now={`${percentage}`} />
            }


            <div>
                {errors.map(errorMsg=>
                     <p style={{color:'red'}} key={errorMsg}>
                    {errorMsg}
                    </p>
                    )}
            </div>
        
            <Row>
                <Col>
                    <button 
                    onClick = {handleSubmit}
                    className="message-form-button"
                    style={{
                        width:'100%'
                    }}
                    disabled= {loading?true:false}
                    >
                        SEND    
                    </button>                
                </Col>
                <Col>
                <button 
                onClick = {handleOpenImageRef}
                className="message-form-button"
                style={{width:'100%'}}
                disabled= {loading?true:false}
                >
                        UPLOAD
                    </button>                
                </Col>
            </Row>

            <input 
            accept="image/jpeg, image/jpg, image/png"
            style={{display:"none"}}
            type="file"
            ref={inputOpenImageRef}
            //업로드 버튼 클릭후 뜨는 창에서 파일 선택한 거는, 여기 input 에 onChange에 의해서 파일을 보내줄 수 있다.
            onChange={handleUploadImage}
            />
        </div>
    )
}

export default MessageForm
