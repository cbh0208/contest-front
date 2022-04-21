<template>
    <div>
        <el-button type="primary" @click="toCreate">创建竞赛</el-button>
        <el-card style="margin: 5px 0;">
            <template v-slot:header>已发布的竞赛</template>

            <el-card v-for="item in contest1" :key="item.id" style="margin: 5px 0;">
                <template v-slot:header>{{item.name}} <el-button  @click="end(item.id)" style="float:right">结束</el-button> </template>
                {{item.description}}
            </el-card>


        </el-card>
        <el-card style="margin: 5px 0;">
            <template v-slot:header>已结束的竞赛</template>

            <el-card v-for="item in contest2" :key="item.id" style="margin: 5px 0;">
                <template v-slot:header>{{item.name}} <el-button  @click="toDetail(item.id)" style="float:right">查看详情</el-button> </template>
                {{item.description}}
            </el-card>


        </el-card>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import {getContestList,endContest} from '@/api/teacher'
import { useRouter } from "vue-router";
const router = useRouter();
let contest1=ref([])//已发布
let contest2=ref([])//已结束



getContestList().then((res)=>{
    contest1.value=res.RE
    contest2.value=res.CL
})

function toCreate(){
    router.push({'path':'/CreateContest/'})
}

function end(id){
    endContest(id).then((res)=>{
        console.log(res);
    })
}

function toDetail(id){
    router.push({'path':`/Grade/${id}/`})
    console.log(id);
}

</script>
<script>
export default {
    name:"ContestList",
}
</script>

<style scoped lang="scss">

</style>