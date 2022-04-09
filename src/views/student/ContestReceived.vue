<template>
    <div>

        <el-card v-for="item in contest" :key="item.id">
            <template v-slot:header>{{item.name}} <el-button @click="attend(item.id)">参加</el-button></template>
            {{item.description}}
        </el-card>
    </div>
</template>
<script setup>
import {ref} from 'vue'
import {getContestReceived} from '@/api/student'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const contest=ref([])
getContestReceived().then((res)=>{
    contest.value=res.data
})


function attend(id){
    router.push({"path":`/contest/${id}/`})
}
</script>
<script>
export default {
    name:"ContestReceived",
}
</script>

<style scoped lang="scss">

</style>