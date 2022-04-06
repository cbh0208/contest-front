import axios from "axios";

export function request(config){
    const instance = axios.create({
        baseURL:'http://127.0.0.1:8000/'
    })

    instance.interceptors.request.use(
        (req)=>{
            const token = window.localStorage.getItem("token");
            if(token){
                req.headers["Authorization"] = token;
            }
            return req
        },
        (error)=>{

        }
    )

    instance.interceptors.response.use(
        (res)=>{
            return res.data ? res.data : res;
        },
        (error)=>{
            // if(error.response.status === 401){
            //     console.log(789456);
            // }
            console.log(error);
            return error
        }
    )

    return instance(config)
}
