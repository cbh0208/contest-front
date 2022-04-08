<template>
    <div>
        <el-button type="primary" @click="toCreate">创建竞赛</el-button>
        <el-card style="margin: 5px 0;">
            <template v-slot:header>已发布的竞赛</template>
            <el-card style="margin: 5px 0;"></el-card>


        </el-card>
        <el-card style="margin: 5px 0;">
            <template v-slot:header>已结束的竞赛</template>
            <el-card style="margin: 5px 0;"></el-card>


        </el-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import {getContestList} from '@/api/teacher'
import { useRouter } from "vue-router";
const router = useRouter();
let contest1=ref([])
let contest2=ref([])



getContestList().then((res)=>{
    contest1.value=res.data
})

function toCreate(){
    router.push({'path':'/CreateContest/'})
}
</script>
<script>
export default {
    name:"ContestList",
}
</script>

<style scoped lang="scss">

</style>