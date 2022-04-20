<template>
    <div>
        
        <el-card>
            <template v-slot:header><div style="text-align:center">分数 {{grade}}</div></template>
            总题数 {{detail.totalNumber}} 答对题数 {{detail.rightNumber}} 正确率 {{Math.round(detail.rightNumber / detail.totalNumber * 10000) / 100 + "%"}}
        </el-card>

        <el-card>
            <template v-slot:header><div style="text-align:center">错题</div></template>
            <el-card v-for="item in detail.wrongList" :key="item.id">
                <template v-slot:header>{{item.question_message}}</template>
                <div><el-tag type="info">A</el-tag>&nbsp;{{item.option_A}}</div>
                <div><el-tag type="info">B</el-tag>&nbsp;{{item.option_B}}</div>
                <div><el-tag type="info">C</el-tag>&nbsp;{{item.option_C}}</div>
                <div><el-tag type="info">D</el-tag>&nbsp;{{item.option_D}}</div>
                <div>
                    我的答案<el-tag type="danger">{{item.my}}</el-tag>
                    正确答案<el-tag  type="success">{{item.answer}}</el-tag>
                </div>
            </el-card>
        </el-card>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import {getDetail} from '@/api/student'
import {useRoute } from 'vue-router'
const route=useRoute()
const grade=ref(0)
const detail=ref({})
getDetail(route.params.id).then((res)=>{
    console.log(res);
    detail.value=res.data
    grade.value=res.grade
})

</script>
<script>
export default {
    name:"GradeDetails",
}
</script>

<style scoped lang="scss">

</style>