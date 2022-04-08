<template>
    <div>
        <el-steps :active="active" finish-status="success" style="padding: 10px 0;">
            <el-step title="初始化"></el-step>
            <el-step title="配置"></el-step>
            <el-step title="发布"></el-step>
        </el-steps>

        <div v-if="active===0" class="Initialize">
            <el-form  label-width="80px">
                <el-form-item label="竞赛名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="竞赛描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>


                <el-form-item label="所用题库">
                    <el-select v-model="form.bank" placeholder="请选择所用题库">
                        <el-option v-for="o in bankList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出题类型">
                    <el-radio v-model="form.type" label="fixed">固定试卷</el-radio>
                    <el-radio v-model="form.type" label="select">抽题试卷</el-radio>
                    <el-radio v-model="form.type" label="random">随机试卷</el-radio>
                </el-form-item>
            </el-form>

        </div>

        <div v-if="active===1" class="Config">

            <div class='fixed' v-if="form.type=='fixed'">
                <h1 style="position:sticky;top:0px">试卷总分 {{totalScore1}}</h1>
                <el-card style="margin: 5px 0;">
                    <template v-slot:header style="text-align:center">单选题</template>

                    <el-card style="margin: 5px 0;">
                        总共{{questionList.SC.length}}题   已选{{questionSelected.SC.length}}
                        <el-form>
                            <el-form-item label="每题分数">
                                <el-input-number v-model="questionScore.SC" controls-position="right" :min="1"  label="每题分数"></el-input-number>
                            </el-form-item>
                        </el-form>
                    </el-card>

                    <el-checkbox-group v-model="questionSelected.SC">
                        <el-col :span="1">
                            <el-checkbox v-for="item in questionList.SC" :key="item.id" :label="item.id" >{{item.question_message}} </el-checkbox>
                        </el-col>
                        
                    </el-checkbox-group>
                </el-card>


                
            </div>

            <div class='select' v-if="form.type=='select'">
                <h1>试卷总分 {{totalScore2}}</h1>
                <el-card style="margin: 5px 0;">
                    <template v-slot:header>单选题</template>

                    <el-card style="margin: 5px 0;">
                        总共{{questionList.SC.length}}题   已选{{questionSelected.SC.length}}
                        <el-form>
                            <el-form-item label="题目数">
                                <el-input-number v-model="questionNum.SC" controls-position="right" :min="0" :max="questionSelected.SC.length" label="题目数"></el-input-number>
                            </el-form-item>
                            <el-form-item label="每题分数">
                                <el-input-number v-model="questionScore.SC" controls-position="right" :min="1"  label="每题分数"></el-input-number>
                            </el-form-item>
                        </el-form>
                    </el-card>

                    <el-checkbox-group v-model="questionSelected.SC">
                        <el-col :span="1">
                            <el-checkbox v-for="item in questionList.SC" :key="item.id"  :label="item.id" >{{item.question_message}} </el-checkbox>
                        </el-col>
                        
                    </el-checkbox-group>


                </el-card>
            </div>

            <div class='random' v-if="form.type=='random'">
                <h1>试卷总分 {{totalScore3}}</h1>
                <el-card style="margin: 5px 0;">
                    <template v-slot:header>单选题</template>

                    <el-card style="margin: 5px 0;">
                        总共{{questionList.SC.length}}题   
                        <el-form>
                            <el-form-item label="题目数">
                                <el-input-number v-model="questionNum.SC" controls-position="right" :min="0" :max="questionList.SC.length" label="题目数"></el-input-number>
                            </el-form-item>
                            <el-form-item label="每题分数">
                                <el-input-number v-model="questionScore.SC" controls-position="right" :min="1"  label="每题分数"></el-input-number>
                            </el-form-item>
                        </el-form>
                    </el-card>

                </el-card>
            </div>
        </div>

        <div v-if="active===2" class="Publish">

            <div class="block">
                <span class="demonstration">默认</span>
                <el-date-picker
                v-model="time.range"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-input-number v-model="time.duration" controls-position="right" :min="10"  :step="10" label="考试时长"></el-input-number>
        </div>



        <div class="but">
            <el-button style="margin-top: 12px;" v-if="active===1||active===2" @click="pre">上一步</el-button>
            <el-button style="margin-top: 12px;" v-if="active===2" @click="pub">发布</el-button>
            <el-button style="margin-top: 12px;" v-if="active===0||active===1" @click="next">下一步</el-button>
        </div>


    </div>
</template>
<script setup>
import { ref ,reactive ,computed, toRaw} from 'vue'
import { ElMessage } from 'element-plus'
import {getBankList,getBank,createContest} from '@/api/teacher'
const active=ref(0)
let bankList=ref([])
const form=reactive({
    name:'',
    description:'',
    bank:'',
    type:'fixed'
})
let questionList=reactive({
    SC:[]
})
const questionNum=reactive({
    SC:0,
})
const questionScore=reactive({
    SC:5,
})

const questionSelected=reactive({
    SC:[],
})

const totalScore1=computed(()=>{
    return questionSelected.SC.length*questionScore.SC
})
const totalScore2=computed(()=>{
    return questionNum.SC*questionScore.SC
})
const totalScore3=computed(()=>{
    return questionNum.SC*questionScore.SC
})

const time=reactive({
    range:['',''],
    duration:90
})

getBankList().then((res)=>{
    bankList.value=res.data
})


function pre(){
    active.value--
}

function next(){
    
    if(active.value==0){
        if(form.bank==''||form.name==''||form.description==''){
            ElMessage('请填写相关信息')
            return 
        }
        getBank(form.bank).then((res)=>{
            questionList.SC=res.data
        })
        active.value++
    }
    else if(active.value==1){ 
        if(form.type==='fixed'){
            if(totalScore1==0){
                ElMessage('请填写相关信息')
                return 
            }
            else active.value++
        }
        else if(form.type==='select'){
            if(totalScore2==0){
                ElMessage('请填写相关信息')
                return 
            }
            else active.value++
        }
        else if(form.type==='random'){
            if(totalScore3==0){
                ElMessage('请填写相关信息')
                return 
            }
            else active.value++
        }
        
    }
    
    
}

function pub(){
    const config={}
    config.bank=form.bank;
    config.type=form.type;
    if(form.type==='fixed'){
        config.SCList=questionSelected.SC
        config.SCScore=questionScore.SC
    }
    else if(form.type==='select'){
        config.SCList=questionSelected.SC
        config.SCNum=questionNum.SC
        config.SCScore=questionScore.SC
    }
    else if(form.type==='random'){
        config.SCNum=questionNum.SC
        config.SCScore=questionScore.SC

    }


    createContest(form.name,form.description,JSON.stringify(config),toRaw(time)).then((res)=>{
        

        if(res.message=='创建成功'){
            ElMessage('创建成功')
            router.push({'path':`/teacher`})
        }
        else{
            ElMessage('创建失败')
        }
    })
}


</script>



<script>
export default {
    name:"CreateContest",
}
</script>

<style scoped lang="scss">
.but {
    text-align:center
}

.el-checkbox__label {
  display: inline;
}
</style>