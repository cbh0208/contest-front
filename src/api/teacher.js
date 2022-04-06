import { request } from "./request";

// 获取题库列表
export function getBankList(){
    return request({
        url:'contest/bank_list',
        method:'get'
    })
}

// 获取题库信息(题目列表)
export function getBank(id){
    return request({
        url:`contest/bank/${id}/`,
        method:'get'
    })
}

// 创建题库
export function createBank(form){
    return request({
        url:'contest/bank_add',
        method:'post',
        data:form
    })
}

// 删除题目
export function deleteQuestion(id){
    return request({
        url:'contest/question_delete',
        method:'post',
        data:{
            'id':id
        }
    })
}

// 添加题目
export function addQuestion(form,id){
    return request({
        url:'contest/question_add',
        method:'post',
        data:{
            'form':form,
            'id':id
        }
    })
}

// 添加题目(批量)
export function addQuestionBatch(formData){
    return request({
        url:'contest/question_add_batch',
        method:'post',
        data:formData
    })
}

// 获取竞赛列表
export function getContestList(){
    return request({
        url:'contest/get_contest_list',
        method:'get'
    })
}

// 创建竞赛
export function createContest(){
    return request({
        utl:'',
        method:''

    })
}

// 配置竞赛
export function configContest(){
    return request({

    })
}

// 发布竞赛
export function publishContest(){
    return request({

    })
}

// 获取某竞赛所有成绩
export function getAllGrade(){
    return request({

    })
}
