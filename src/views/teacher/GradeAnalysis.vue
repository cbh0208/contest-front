<template>
    <div>
        <el-collapse>
            <el-collapse-item v-for="(v,k,i) in details" :key="i">
                <template #title>
                    <div>{{v['question_message']}}</div>
                    <div><el-tag>错误率:{{v['rate']}}%</el-tag><el-tag>错误数:{{v['list'].length}}</el-tag></div>
                    
                </template>
                <ul>
                    <li>A:{{v['option_A']}}</li>
                    <li>B:{{v['option_B']}}</li>
                    <li>C:{{v['option_C']}}</li>
                    <li>D:{{v['option_D']}}</li>
                </ul>
                答案:<el-tag>{{v['answer']}}</el-tag>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {getGradeAnalysis} from '../../api/teacher'
const route=useRoute()
const details=ref({})
getGradeAnalysis(route.params.id).then((res)=>{
    details.value=res.data
    console.log(res.data);
})
</script>
<script>
export default {
    name:"GradeAnalysis",
}
</script>

<style scoped lang="scss">

</style>