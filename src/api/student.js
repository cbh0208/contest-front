import { request } from "./request";

// 获取可参加的竞赛
export function getContestReceived(){
    return request({
        url:'/contest/get_contest_received',
        method:'get'
    })
}

// 获取竞赛题目
export function getContest(){
    return request({

    })
}




// 获取成绩
export function getGrade(){
    return request({

    })
}