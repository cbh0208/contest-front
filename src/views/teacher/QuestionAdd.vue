<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="单独添加">
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
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                </el-form>





            </el-tab-pane>
            <el-tab-pane label="批量添加">
                <input type="file" accept=".xls,.xlsx" ref='file'>
                <el-button type="primary" @click="onSubmit2">上传</el-button>
            </el-tab-pane>


        </el-tabs>
    </div>
</template>
<script setup>
import {ref,reactive,toRaw} from 'vue'
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route=useRoute()
import {addQuestion,addQuestionBatch} from '@/api/teacher'
import { ElMessage } from 'element-plus'
const form=reactive({
    question_message:'',
    type:'',
    option_A:'',
    option_B:'',
    option_C:'',
    option_D:'',
    answer:''
})
let file=ref()
function onSubmit(){
    addQuestion(toRaw(form),route.params.id).then((res)=>{
        if(res.message=='创建成功'){
            ElMessage('创建成功')
            router.push({'path':`/bank/${route.params.id}/`})
        }
        else{
            ElMessage('创建失败')
        }
    })
}
function onSubmit2(){
    let formData = new FormData();
    formData.append('excel',file.value.files[0])
    formData.append('id',route.params.id)
    addQuestionBatch(formData).then((res)=>{
        if(res.message=='创建成功'){
            ElMessage('创建成功')
            router.push({'path':`/bank/${route.params.id}/`})
        }
        else{
            ElMessage('创建失败')
        }
    })
}

</script>
<script>
export default {
    name:"QuestionAdd",
}
</script>

<style scoped lang="scss">

</style>