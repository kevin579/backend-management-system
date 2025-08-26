import request from './index'

export const captchaAPI = ()=>{
    return request.get("/prod-api/captchaImage")
}