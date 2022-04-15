<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="题干">
                <el-input v-model="form.question_message"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择类型">
                <el-option label="单选题" value="SC"></el-option>
                <el-option label="多选题" value="MC"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="A选项">
                <el-input v-model="form.option_A"></el-input>
            </el-form-item>
            <el-form-item label="B选项">
                <el-input v-model="form.option_B"></el-input>
            </el-form-item>
            <el-form-item label="C选项">
                <el-input v-model="form.option_C"></el-input>
            </el-form-item>
            <el-form-item label="D选项">
                <el-input v-model="form.option_D"></el-input>
            </el-form-item>
                    
            <el-form-item label="答案">
                <el-input v-model="form.answer"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive ,toRaw} from 'vue'
import {getCurrentQuestion,editQuestion} from '@/api/teacher'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const form=reactive({
    question_message:'',
    type:'',
    option_A:'',
    option_B:'',
    option_C:'',
    option_D:'',
    answer:''
})
getCurrentQuestion(route.params.id).then((res)=>{
    form.question_message=res.data[0].question_message
    form.type=res.data[0].type;
    form.option_A=res.data[0].option_A
    form.option_B=res.data[0].option_B
    form.option_C=res.data[0].option_C
    form.option_D=res.data[0].option_D
    form.answer=res.data[0].answer
})
function onSubmit(){
    editQuestion(toRaw(form),route.params.id).then((res)=>{
        ElMessage(res.message)
        router.back()
    })
}
</script>
<script>
export default {
    name:"QuestionEdit",
}
</script>

<style scoped lang="scss">

</style>