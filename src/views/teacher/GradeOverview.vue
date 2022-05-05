<template>
    <div>
        <el-card>
            参加人数 {{grade.length}} 最高分 {{maxScore}} 最低分 {{minScore}} 平均分 {{averageScore}}
        </el-card>
        <el-table :data="grade">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="score" label="分数" width="180" />
        </el-table>
    </div>
</template>

<script setup >
import {ref,computed} from 'vue'
import {useRoute} from 'vue-router'
import {getAllGrade} from '@/api/teacher'
const route=useRoute()
const grade=ref([])
const score=ref([])

let maxScore=computed(()=>{
    return Math.max.apply(null,score.value)
})
let minScore=computed(()=>{
    return Math.min.apply(null,score.value)
})
let averageScore=computed(()=>{
    let all=0
    for(let i in score.value){
        all+=score.value[i]
    }
    return all/score.value.length
})
getAllGrade(route.params.id).then((res)=>{
    grade.value=res.data
    const sc=[]
    for(let i in res.data){
        sc.push(parseInt(res.data[i]['score']))
    }
    score.value=sc
    console.log(res.data);
})


</script>
<script >
export default {
    name:"GradeOverview",
}
</script>

<style scoped lang="scss">

</style>