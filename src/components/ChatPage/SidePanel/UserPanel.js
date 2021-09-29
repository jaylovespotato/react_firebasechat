import React, { useRef } from 'react'
import {IoIosChatboxes} from 'react-icons/io'
import {Dropdown, Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../../../firebase'
import mime from 'mime-types';
import { setPhotoURL } from '../../../redux/actions/user_action'


function UserPanel() {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const inputOpenImageRef = useRef();

    const handleLogout = ()=>{
        firebase.auth().signOut();
    }

    const handleOpenImageRef = ()=>{
        //임의로 안보이는 아이를 크릭
        inputOpenImageRef.current.click();
    }

    const handleUploadImage = async (e)=>{
        const file = e.target.files[0];
        const metadata = {contentType: mime.lookup(file.name)}
        
        
        try {
            //스토리지에 파일 저장하기
            let uploadTaskSnapshpt = await firebase.storage().ref()
            .child(`user_image/${user.uid}`)
            .put(file, metadata)
            console.log('uploadTaskSnapshot', uploadTaskSnapshpt)


            //Auth 서비스 프로필 이미지 수정.(비번 바꾸듯이 정보를 바꾸는 것임, 스토리지인듯?)
            let downloadURL = await uploadTaskSnapshpt.ref.getDownloadURL();

            await firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
            })
            //자 그럼, 이제 firebase는 해결됐고, redux의 photoURL 도 바꿔줘야 프로필상의 사진이 바뀜. dispatch 고고
            dispatch(setPhotoURL(downloadURL));

            //DB에 이미지 URL 저장
            await firebase.database().ref("users")
            .child(user.uid)
            .update({image: downloadURL})
            console.log("ok2")

        } catch (error) {
            alert(error)
        }
    }


    return (
        <div>
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
                        <Dropdown.Item onClick={handleOpenImageRef}>프로필 사진 변경</Dropdown.Item>
                        
                        <Dropdown.Item onClick={handleLogout}>로그 아웃</Dropdown.Item>
                        
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <input
                onChange={handleUploadImage}
                accept="image/jpeg, image/png"
                style={{display:'none'}}
                ref={inputOpenImageRef}
                type="file"
                >

            
            </input>


            

        </div>
    )
}


export default UserPanel
