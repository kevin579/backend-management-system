import {useEffect, useState, type ChangeEvent} from 'react'
import style from './login.module.scss'
import background from "./init.ts"

import { Input, Space, Button } from "antd";
import './login.less'

const View = ()=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [captcha,setCaptcha] = useState('');

    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value);
        console.log(username);
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
        console.log(password);
    }
    const captchaChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setCaptcha(e.target.value);
        console.log(captcha);
    }

    useEffect(()=>{
        background();
        window.onresize = ()=>background();
    })
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
                        <div className="captchBox">
                            <Input placeholder='Captcha' style={{width:350}} onChange={captchaChange}/>
                            <img src="../../../public/logo.png" alt="" className= "captchImg"/>
                        </div>
                        <Button type="primary" block>Login</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}


export default View;