<template>
    <div>
        GradeAnalysis{{route.params.id}}
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router'
const route=useRoute()
</script>
<script>
export default {
    name:"GradeAnalysis",
}
</script>

<style scoped lang="scss">

</style>