import {useEffect, useState, useRef, type ChangeEvent} from 'react'
import { useNavigate } from 'react-router-dom';

import { Input, Space, Button } from "antd";
import '@ant-design/v5-patch-for-react-19';

import ReCAPTCHA from "react-google-recaptcha";

import style from './login.module.scss'
import background from "./init.ts"
import './login.less'

const View = ()=>{
    //Set State
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [captcha,setCaptcha] = useState('');

    // Set Ref
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    // Enable navigate
    const navigate = useNavigate();

    // Handle input changes
    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
        console.log(username);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
        console.log(password);
    }
    const captchaChange = (value:string|null)=>{
        value = value || ''
        setCaptcha(value);
    }

    // When user click login, fetch data to backend
    const handleLogin = async()=>{
        // verify captch
        if (!captcha){
            alert('Please verify')
            return;
        }

        // fetch to server
        const res = await fetch('http://127.0.0.1:4000/api/login',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({username,password,captcha})
        })

        // Receive server data and display information
        const data = await res.json();
        console.log(data.message);
        if (res.ok){
            navigate('/')
        }else{
            alert('Invalid Username or Password')
        }

        //Reset Captch
        recaptchaRef.current?.reset();
        setCaptcha('');
    }

    // Handle Background
    useEffect(()=>{
        background();
        window.onresize = ()=>background();
    },[])

    return (
        <div className={style.loginPage + " loginPage"}>
            {/* background */}
            <canvas id="canvas" style={{display:"block"}}></canvas>
            {/* Login */}
            <div className={style.container}>
                <div className={style.title}>
                    <h1>Backend Management System</h1>
                    <p>2025-08-20 Edition</p>
                </div>
                <div className={style.form}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Input placeholder="Username" onChange={usernameChange}/>
                        <Input.Password placeholder="Password" onChange={passwordChange}/>
                        <ReCAPTCHA
                            ref = {recaptchaRef}
                            sitekey="6LdSXLMrAAAAALiDDFTu7ujJcNKuyPYbJ0hsuRtI"
                            onChange={captchaChange}
                        />
                        <Button type="primary" block onClick={handleLogin}>Login</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}


export default View;