<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="题库管理">
                <BankList></BankList>
            </el-tab-pane>
            <el-tab-pane label="竞赛管理">
                <ContestList></ContestList>
            </el-tab-pane>
            <el-tab-pane label="我的账户">
                
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script setup>
import BankList from '../teacher/BankList.vue'
import ContestList from '../teacher/ContestList.vue'

</script>


<style scoped lang="scss">

</style>
<script>
export default {
    name:"Teacher",
}
</script>