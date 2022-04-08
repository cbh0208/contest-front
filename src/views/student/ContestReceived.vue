<template>
    <div>

        <el-card v-for="item in contest" :key="item.id">
            <template v-slot:header>{{item.name}}</template>
            {{item.description}}
        </el-card>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import {getContestReceived} from '@/api/student'
const contest=ref([])
getContestReceived().then((res)=>{
    contest.value=res.data
    console.log(res);
})
</script>
<script>
export default {
    name:"ContestReceived",
}
</script>

<style scoped lang="scss">

</style>