<template>
    <div>
        <div class="sheet">
            <el-card>
                <template v-slot:header><div style="text-align:center"><strong >答题卡</strong></div></template>
                <div class="grid" >
                    
                    <div class="grid-item" v-for="(item,index) in result" :key="item.id" @click="jump(item.id)">
                        <el-tag v-if="item.my==''" type="info">{{index+1}}</el-tag>
                        <el-tag v-else>{{index+1}}</el-tag>
                    </div>
                </div>
            </el-card>
            
        </div>

        <div class="time">
            <el-card>
                <template v-slot:header><div style="text-align:center"><strong >剩余时间</strong></div></template>
                <div style="text-align:center"><strong >{{countdown}}</strong></div>
            </el-card>
        </div>
        <div class="save">
            <el-card>
                {{countdownForSave}}秒后保存
                <el-button @click="temp">立即保存</el-button>
            </el-card>
        </div>

        <el-form>
            <el-card v-for="(item,index) in question" :key="item.id" style="margin: 5px 0;" :id="item.id">
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, } from 'element-plus'
import {getContest,contestSubmit,temporarySubmit} from '@/api/student'
const route=useRoute()
const router=useRouter()
const question=ref([]) // 试卷
const result=ref([])    // 答题卡
const endTime=ref(0)   // 结束时间
const countdown=ref('') // 倒计时(提交)
const countdownForSave=ref(60)

/** 获取(试卷,答题卡,时间) */
getContest(route.params.id).then((res)=>{
    if(res.message){
        ElMessage(res.message)
        router.push({'path':`/student/`})
    }
    question.value=res.data.List
    result.value=res.data.result
    console.log(res.data.endTime,1);
    console.log(new Date(res.data.endTime));
    endTime.value=new Date(res.data.endTime)
    console.log(endTime.value);
    
})

/** 提交(答题卡) */
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

/** 暂存(答题卡,时间) */
function temp(){
    temporarySubmit(route.params.id,result.value,endTime.value).then((res)=>{
        ElMessage(res.message)
    })
    countdownForSave.value=60
}

function jump(id){
    let element=document.getElementById(id)
    if(element) element.scrollIntoView({behavior:'smooth'})
}


/** 展示时间(倒计时) */
function showTime(){
    let now=new Date()
    let end=endTime.value
    let left = end.getTime() - now.getTime() //距离结束时间的毫秒数
    if(left<=0) onSubmit()
    let leftH= Math.floor(left/(1000*60*60)%24) //计算小时数
    let leftM = Math.floor(left/(1000*60)%60)  //计算分钟数
    let leftS = Math.floor(left/1000%60)  //计算秒数

    countdown.value= formatNumber(leftH) + ":" + formatNumber(leftM) + ":" + formatNumber(leftS)


}
/**格式化数字 */
const formatNumber = (n) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}


/** */
const t1=setInterval (function () {
    showTime()
}, 1000);  

/** */
const t2=setInterval (function(){
    countdownForSave.value--
    if(countdownForSave.value===0){
        console.log(countdownForSave.value);
        countdownForSave.value=60
        temp()
    }
},1000)

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
    transform: translate(-210px,200px);
}
.grid {
    display: grid;
    widows: 160px;

    grid-template-columns: 30px 30px 30px 30px 30px;

}
.grid-item {
    display: inline-block;
    width: 22.5px;
}

.time {
    position: fixed;
    width: 200px;
    transform: translate(830px,200px);
}

.save {
    position: fixed;
    width: 135px;
    transform: translate(830px);
}

</style>