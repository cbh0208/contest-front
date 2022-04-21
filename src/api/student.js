import { request } from "./request";

/** 获取可参加的竞赛 */ 
export function getContestReceived(){
    return request({
        url:'/contest/get_contest_received',
        method:'get'
    })
}

/** 获取竞赛题目 */ 
export function getContest(id){
    return request({
        url:`/contest/get_contest/${id}/`,
        method:'get'


    })
}

/** 暂存题目 */ 
export function temporarySubmit(id,result){
    return request({
        url:`/contest/temporary_submit/${id}/`,
        method:'post',
        data:{
            result:result
        }
    })
}

/** 提交题目 */ 
export function contestSubmit(id,result){
    return request({
        url:'/contest/contest_submit',
        method:'post',
        data:{
            id:id,
            result:result
        }
    })
}

/** 获取成绩 */ 
export function getGrade(){
    return request({
        url:'/contest/get_grade',
        method:'get'

    })
}

/** 获取成绩细节 */ 
export function getDetail(id){
    return request({
        url:`contest/get_detail/${id}/`,
        method:'get'
    })
}