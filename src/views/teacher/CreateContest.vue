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
                        <el-option v-for="o in bank" :key="o.id" :label="o.name" :value="o.id"></el-option>
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
            1
        </div>
        <div v-if="active===2" class="Publish">
            <div class='fixed' v-if="form.type=='fixed'">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="禁用" disabled></el-checkbox>
                    <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class='select' v-if="form.type=='select'">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="禁用" disabled></el-checkbox>
                    <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class='random' v-if="form.type=='random'">
                3
            </div>
        </div>
        <div v-if="active===3">
            3
        </div>
        <div class="but">
            <el-button style="margin-top: 12px;" v-if="active===1||active===2" @click="pre">上一步</el-button>
            <el-button style="margin-top: 12px;" v-if="active===2" @click="pub">发布</el-button>
            <el-button style="margin-top: 12px;" v-if="active===0||active===1" @click="next">下一步</el-button>
        </div>


    </div>
</template>
<script setup>
import { ref ,reactive} from 'vue'
import { ElMessage } from 'element-plus'
import {getBankList,getBank} from '@/api/teacher'
const active=ref(0)
let bank=ref([])
const form=reactive({
    name:'',
    description:'',
    bank:'',
    type:'fixed'
})
const checkList=ref([])

getBankList().then((res)=>{
    bank.value=res.data
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
            bank.value=res.data
            console.log(res.data);
        })
    }
    if(active.value==1){ 
        
    }
    active.value++
}

function pub(){

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


</style>