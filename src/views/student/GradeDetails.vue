<template>
    <div>
        
        <el-card>
            <template v-slot:header><div style="text-align:center">分数 {{grade}}</div></template>
            总题数 {{detail.totalNumber}} 答对题数 {{detail.rightNumber}} 正确率 {{Math.round(detail.rightNumber / detail.totalNumber * 10000) / 100 + "%"}}
        </el-card>



        <div class="sheet">
            <el-card>
                <template v-slot:header><div style="text-align:center"><strong >答题卡</strong></div></template>
                <div class="grid" >
                    
                    <div class="grid-item" v-for="(item,index) in detail.wrongList" :key="item.id" @click="jump(item.id)">
                        <el-tag v-if="item.state" type="success">{{index+1}}</el-tag>
                        <el-tag v-else type="danger">{{index+1}}</el-tag>
                    </div>
                </div>
            </el-card>
        </div>

        <el-card>
            <template v-slot:header><div style="text-align:center">题目回顾</div></template>
            <el-card v-for="(item,index) in detail.wrongList" :key="item.id" :id="item.id" >
                <template v-slot:header>{{index+1}} - {{item.question_message}}</template>
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
    detail.value=res.data
    grade.value=res.grade
})

function jump(id){
    let element=document.getElementById(id)
    if(element) element.scrollIntoView({behavior:'smooth'})
}

</script>
<script>
export default {
    name:"GradeDetails",
}
</script>

<style scoped lang="scss">
.sheet {
    position: fixed;
    width: 200px;
    transform: translate(-210px,200px);
}
.grid {
    display: grid;
    widows: 160px;

    grid-template-columns: 30px 30px 30px 30px 30px;

}
.grid-item {
    display: inline-block;
    width: 29px;
}
</style>