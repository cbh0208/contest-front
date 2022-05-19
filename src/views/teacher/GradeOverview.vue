<template>
    <div>
        <el-card>
            参加人数 {{grade.length}} 最高分 {{maxScore}} 最低分 {{minScore}} 平均分 {{averageScore}}
        </el-card>

        <div class="echarts">
            <h1>成绩分布图</h1>
            <div id="bar"></div>
            <div id="pie"></div>
        </div>

        <el-table :data="grade">
            <el-table-column prop="username" label="用户名" width="180" />
            <el-table-column prop="score" label="分数" width="180" />
        </el-table>
    </div>
</template>

<script setup >
import {ref,computed,onMounted} from 'vue'
import {useRoute} from 'vue-router'
import * as echarts from 'echarts';
import {getAllGrade} from '@/api/teacher'

const route=useRoute()
const grade=ref([])
const score=ref([])
const dataForCharts=ref({})
const barX=ref([])
const barY=ref([])
const pie=ref([])

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
    for(let i in score.value){
        let index=Math.floor(score.value[i]/20)
        let name=`${20*index}-${20*(index+1)-1}`
        if(dataForCharts.value[name]){
            dataForCharts.value[name]+=1
        }
        else{
            dataForCharts.value[name]=1
        }
    }
    barX.value=Object.keys(dataForCharts.value)
    barY.value=Object.values(dataForCharts.value)
    for(let [k,v] of Object.entries(dataForCharts.value)){
        pie.value.push({'name':k,'value':v})
    }


    load()
})


function load(){
    var barChart=echarts.init(document.getElementById('bar'));
    var pieChart=echarts.init(document.getElementById('pie'));
    barChart.setOption({
        xAxis: {
            type: 'category',
            data: barX.value
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: barY.value,
            type: 'bar'
            }
        ]
    })
    pieChart.setOption({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: pie.value,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
    })
}




</script>
<script >
export default {
    name:"GradeOverview",
}
</script>

<style scoped lang="scss">
#bar , #pie {
    display: inline-block;
    width: 350px;
    height: 200px;
    margin: 8px;
}
</style>