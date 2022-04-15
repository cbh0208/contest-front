<template>
    <div>
        <div class="sheet">
            <el-card>
                <template v-slot:header><div style="text-align:center"><strong >答题卡</strong></div></template>
                <div class="grid" >
                    
                    <div class="grid-item" v-for="(item,index) in result" :key="item.id">
                        <el-tag v-if="item.my==''" type="info">{{index+1}}</el-tag>
                        <el-tag v-else>{{index+1}}</el-tag>
                    </div>
                </div>
            </el-card>
            
        </div>
        
        <el-form>
            <el-card v-for="(item,index) in question" :key="item.id" style="margin: 5px 0;">
                <template v-slot:header>
                    <el-tag>{{index+1}}</el-tag>
                    {{item.question_message}}
                    <el-tag type="info" v-if="item.type=='SC'">单选题  {{item.score}}分</el-tag>
                </template>
                <el-radio-group v-model="result[index]['my']">
                    <el-col :span="1"> 
                        <el-radio label="A">{{item.option_A}}</el-radio>
                        <el-radio label="B">{{item.option_B}}</el-radio>
                        <el-radio label="C">{{item.option_C}}</el-radio>
                        <el-radio label="D">{{item.option_D}}</el-radio>
                    </el-col>
                </el-radio-group>
            </el-card>
        </el-form>
        <div style="text-align:center">
            <el-popconfirm style="test"
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                title="确定创建吗"
                @confirm="onSubmit"
                >
                <template v-slot:reference>
                    <el-button type="primary">交卷</el-button>
                </template>
            </el-popconfirm>
        </div>
    </div>
</template>
<script setup>
import { reactive,ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, } from 'element-plus'
import {getContest,contestSubmit} from '@/api/student'
const route=useRoute()
const router=useRouter()
const question=ref([])
const result=ref([])
getContest(route.params.id).then((res)=>{
    console.log(res);
    question.value=res.data.List
    result.value=res.data.result
})

function onSubmit(){
    contestSubmit(route.params.id,result.value).then((res)=>{
        if(res.message=='提交成功'){
            ElMessage('提交成功')
            router.push({'path':`/student/`})
        }
        else{
            ElMessage(res.message)
        }
    })
}

</script>
<script>
export default {
    name:"Contest",
}
</script>

<style scoped lang="scss">
.sheet {
    position: fixed;
    width: 200px;
    transform: translate(-200px,200px);
}
.grid {
    display: grid;
    widows: 160px;

    grid-template-columns: 30px 30px 30px 30px 30px;

}
.grid-item {
    display: inline-block;
}

</style>