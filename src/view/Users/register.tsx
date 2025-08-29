import {useEffect, useState, useRef, type ChangeEvent} from 'react'
import { useNavigate } from 'react-router-dom';

// Antd styles
import { Input, Space, Button } from "antd";
import '@ant-design/v5-patch-for-react-19';

// Captch
import ReCAPTCHA from "react-google-recaptcha";

import style from './login.module.scss'
import background from "./init.ts"
import './login.less'

const View = ()=>{
    // Set State
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [captcha,setCaptcha] = useState('');

    //Set Ref
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const promptRef = useRef<HTMLParagraphElement>(null);

    // Enable Navigate
    const navigate = useNavigate();

    
    //Handle Input changes
    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
        console.log(username);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
        console.log(password);
    }
    const passwordChange2 = (e:ChangeEvent<HTMLInputElement>)=>{
        setPassword2(e.target.value);
        console.log(password2);
    }
    const captchaChange = (value:string|null)=>{
        value = value || ''
        setCaptcha(value);
        console.log(value);
    }

    //When the user clicks submit, send the data to backend
    const handleRegister = async()=>{
        // Verify Captch
        if (!captcha){
            promptRef.current!.innerHTML='Please verify';
            return;
        }
        // Fetch data
        const res = await fetch('http://127.0.0.1:4000/api/register',{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({username,password,password2,captcha})
        })

        // Get and show register state
        const data = await res.json();
        console.log(data.state,data.message);
        promptRef.current!.innerHTML=data.message;

        // Redirect to login page
        if (data.state===0){
            promptRef.current!.style.color = 'green';
            setTimeout(()=>{
                navigate('/login')
            },2000)
        }
        
        // Reset Captch
        recaptchaRef.current?.reset();
        setCaptcha('');
    }

    // Handle backgrounnd
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
                <div className={style.form} style={{textAlign:'center'}}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Input placeholder="Username" onChange={usernameChange}/>
                        <Input.Password placeholder="Password" onChange={passwordChange}/>
                        <Input.Password placeholder="Confirm Password" onChange={passwordChange2}/>
                        
                        <ReCAPTCHA
                            ref = {recaptchaRef}
                            sitekey="6LdSXLMrAAAAALiDDFTu7ujJcNKuyPYbJ0hsuRtI"
                            onChange={captchaChange}
                        />
                        <Button type="primary" block onClick={handleRegister}>Register</Button>
                        <p ref = {promptRef} style={{color:'red'}}></p>
                    </Space>
                </div>
            </div>
        </div>
    )
}


export default View;