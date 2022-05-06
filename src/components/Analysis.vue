<template>
    <div id="main">

    </div>

</template>

<script setup >
import {onMounted,ref,toRaw} from 'vue'
import {useRoute} from 'vue-router'
import * as echarts from 'echarts';
import {getGradeAnalysis} from '../api/teacher'
const route=useRoute()
const nameArr=ref([])
const valueArr=ref([])
const details=ref({})
getGradeAnalysis(route.params.id).then((res)=>{
    nameArr.value=res.data.nameArr
    valueArr.value=res.data.valueArr
    details.value=res.data.details
    load()
})
onMounted(()=>{
    


})
function load(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
    title: {
        text: '错题分析'
    },
    tooltip: {
        formatter:(params)=>{
            return `
            <div>
                ${details.value[params.name]['question_message']}
            </div>
            <div>
                A:${details.value[params.name]['option_A']}
            </div>
            <div>
                B:${details.value[params.name]['option_B']}
            </div>
            <div>
                C:${details.value[params.name]['option_C']}
            </div>
            <div>
                D:${details.value[params.name]['option_D']}
            </div>
            <hr/>
            <div>
            题目ID:${params.name} 错误率:${params.value}%
            </div>
            <hr/>
            <div>
                正确答案:<span>A</span>
            </div>
            <div>
                错选情况
                <ul>1</ul>
                <ul>1</ul>
                <ul>1</ul>
            </div>
            `
        },
    },
    yAxis: {
        data:nameArr.value
    },
    xAxis: {},
    series: [
        {
            name: '错误率',
            type: 'bar',
            data: valueArr.value,
        },
    ]
    });
}

</script>
<script>
export default {
    name:"Analysis",
}
</script>

<style scoped lang="scss">
#main {
    width: 500px;
    height: 500px;
}
</style>