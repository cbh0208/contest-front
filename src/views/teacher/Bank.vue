<template>
    <div class="a">
        <!-- {{$route.params.id}} -->
        <el-button type="primary" @click="toAdd($route.params.id)">添加题目</el-button>
        <el-collapse  >
            <el-collapse-item v-for="(o,index) in question" :key="o.id"  >
                <template v-slot:title>
                    <el-tag v-if="o.type==='SC'">单选题</el-tag>
                    <el-tag v-else-if="o.type==='MC'">多选题</el-tag>
                    <el-tag v-else-if="o.type==='JQ'">判断题</el-tag>

                    &nbsp;{{o.question_message}}
                </template>
                <div v-if="o.type==='JQ'">
                    <div><el-tag type="info">A</el-tag>&nbsp;{{o.option_A}}</div>
                    <div><el-tag type="info">B</el-tag>&nbsp;{{o.option_B}}</div>
                </div>
                <div v-else>
                    <div><el-tag type="info">A</el-tag>&nbsp;{{o.option_A}}</div>
                    <div><el-tag type="info">B</el-tag>&nbsp;{{o.option_B}}</div>
                    <div><el-tag type="info">C</el-tag>&nbsp;{{o.option_C}}</div>
                    <div><el-tag type="info">D</el-tag>&nbsp;{{o.option_D}}</div>
                </div>
                



                <div><el-tag type="success">&nbsp;答案</el-tag>{{o.answer}}</div>
                <el-button type="primary" @click="edit(o.id)">修改</el-button>
                <el-popconfirm
                    confirm-button-text='好的'
                    cancel-button-text='不用了'
                    icon="el-icon-info"
                    icon-color="red"
                    title="这是一段内容确定删除吗？"
                    @confirm="deleteIt(o.id,index)"
                    >
                    <template v-slot:reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </el-collapse-item>


        </el-collapse>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import {getBank,deleteQuestion} from '@/api/teacher'
import { ElMessage } from 'element-plus'
let question=ref([])
getBank(route.params.id).then((res)=>{
    question.value=res.data
})

function toAdd(id){
    router.push({'path':`/question_add/${id}/`})
}


function edit(id){
    router.push({'path':`/question_edit/${id}/`})
}

function deleteIt(id,index){
    deleteQuestion(id).then((res)=>{
        ElMessage(res.message)
    })
    question.value.splice(index,1)
}
</script>
<script>
export default {
    name:"Bank",
}
</script>

<style scoped lang="scss">
.a {
    padding: 10px;
}
</style>