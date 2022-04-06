<template>
    <div>
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
  
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">下一步</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import {reactive, ref, toRaw} from 'vue'
import {getBankList} from '@/api/teacher'

let bank=ref([])
const form=reactive({
    name:'',
    description:'',
    bank:'',
    type:'fixed'
})

getBankList().then((res)=>{
    bank.value=res.data
})


function onSubmit(){
    console.log(toRaw(form));
}
</script>



<script>
export default {
    name:"CreateContestInitialize",
}
</script>

<style scoped lang="scss">

</style>