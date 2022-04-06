import { request } from "./request";

export function login(username,password,type){
    return request({
        url:'user/login',
        method:'post',
        data: {
            username,
            password,
            type
          },
    })
}

export function reg(username,password){
    return request({
        url:'user/reg',
        method:'post',
        data:{
            username,
            password
        }
    })
}

export function exit(){
    return request({
        url:'user/exit',
        method:'post'
    })
}