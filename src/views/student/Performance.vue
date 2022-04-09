<template>
    <div>
        <el-card v-for="item in grade" :key="item.id">
            <template v-slot:header>{{item.contest_name}} <el-button @click="toDetail(item.id)">详情</el-button> </template>
            分数:{{item.score}}
        </el-card>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import {getGrade} from '@/api/student'
const grade=ref([])
getGrade().then((res)=>{
    grade.value=res.data
})

function toDetail(id) {
    
}
</script>
<script>
export default {
    name:"Performance",
}
</script>

<style scoped lang="scss">

</style>