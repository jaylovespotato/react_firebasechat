import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import md5 from 'md5';

function RegisterPage() {

    const [errorFromSubmit, seterrorFromSubmit] = useState();
    const [loading, setloading] = useState(false);

    const { register, watch, formState: { errors }, handleSubmit } = useForm({mode:"onChange"});

    const password = useRef();
    password.current = watch("password");
  
    // firebase에서 이메일로 유저 생성
    const onSubmit = async (data) =>{
        try {
            
            setloading(true)
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            console.log("createdUser", createdUser)

            await createdUser.user.updateProfile({
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
            })


            // firebase DB에 저장해주기
            await firebase.database().ref("users").child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL
            })

            setloading(false)

        } catch (error) {
            seterrorFromSubmit(error.message)
            setloading(false)
            setTimeout(() => {
                seterrorFromSubmit("")
            }, 5000);
        }
    
    }

    return (
        <div className="auth-wrapper">
            <div style ={{textAlign: 'center'}}>
                <h3>Register</h3>
            </div>
            
            <form onSubmit = {handleSubmit(onSubmit)}>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required!!</p>}

                <label>Name</label>
                <input
                    name="name"
                    {...register("name", { required: true, maxLength:10 })}
                   
                />
                {errors.name && errors.name.type ==="required" && <p>This name field is reuiqred !</p>}

                {errors.name && errors.name.type ==="maxLength" && <p>Your input exceed maximum length !</p>}

                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    {...register("password", { required: true, minLength:6 })}
                />
                {errors.password && errors.password.type ==="required" && <p>This password field is reuiqred !</p>}

                {errors.password && errors.password.type ==="minLength" && <p>Password must have at least 6 characters !</p>}


                <label>Password Confirm</label>
                <input
                    name="password_confirm"
                    type="password"
                    {...register("password_confirm", { required: true, validate: (value)=>value === password.current })}
                />
                {errors.password_confirm && errors.password_confirm.type ==="required" && <p>This password confirm field is required !</p>}

                {errors.password_confirm && errors.password_confirm.type ==="validate" && <p>The password do not match !</p>}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}
                
                <input type="submit" disabled={loading}/>

            
                <Link style={{ color:'gray', textAlign:'center', textDecoration:'none'}} to='/login'> 이미 아이디가 있다면.. </Link>
            </form>
        </div>
    )
}

export default RegisterPage