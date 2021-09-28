import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {

    const [errorFromSubmit, seterrorFromSubmit] = useState();
    const [loading, setloading] = useState(false);

    const { register, formState: { errors }, handleSubmit } = useForm({mode:"onChange"});

    // firebase에서 이메일로 유저 생성
    const onSubmit = async (data) =>{
        try {
            
            setloading(true)

            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

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
                <h3>Login</h3>
            </div>
            
            <form onSubmit = {handleSubmit(onSubmit)}>

                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required!!</p>}


                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    {...register("password", { required: true, minLength:6 })}
                />
                {errors.password && errors.password.type ==="required" && <p>This password field is reuiqred !</p>}

                {errors.password && errors.password.type ==="minLength" && <p>Password must have at least 6 characters !</p>}



                {errorFromSubmit && <p>{errorFromSubmit}</p>}
                
                <input type="submit" disabled={loading}/>

            
                <Link style={{ color:'gray', textAlign:'center', textDecoration:'none'}} to='/register'> 아직 아이디가 없다면.. </Link>
            </form>
        </div>
    )
}

export default LoginPage