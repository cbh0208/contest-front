<template>
    <div>
        



        <el-tabs type="border-card" v-model="active">
            <el-tab-pane name="GradeOverview">
                <template #label>
                    <router-link :to="'/Grade/'+route.params.id+'/GradeOverview/'">总览</router-link>
                </template>
            </el-tab-pane>
            <el-tab-pane name="GradeAnalysis">
                <template #label>
                    <router-link :to="'/Grade/'+route.params.id+'/GradeAnalysis/'">分析</router-link>
                </template>
            </el-tab-pane>
            <router-view></router-view>
        </el-tabs>

    </div>
</template>
<script setup>
import {computed, ref,watch} from 'vue'
import {useRoute} from 'vue-router'
const route=useRoute()

const active=ref(route.name)

</script>
<script>
export default {
    name:"Grade",
}
</script>

<style scoped lang="scss">

</style>