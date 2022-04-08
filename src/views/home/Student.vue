<template>
    <el-tabs type="border-card">
        <el-tab-pane label="竞赛">
            <ContestReceived></ContestReceived>
        </el-tab-pane>
        <el-tab-pane label="成绩查询">
            <Performance></Performance>
        </el-tab-pane>
        <el-tab-pane label="我的账户">
            
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name:"Student",
}
</script>
<script setup>
import ContestReceived from '@/views/student/ContestReceived.vue'
import Performance from '@/views/student/Performance.vue'
</script>
<style scoped lang="scss">

</style>