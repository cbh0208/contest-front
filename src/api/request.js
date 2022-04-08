import axios from "axios";
import router from "@/router";
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

            if(error.response.status === 401){
                router.push({ path: "/login" });
            }
            console.log(error);
        }
    )

    return instance(config)
}
