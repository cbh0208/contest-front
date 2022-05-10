<template>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formInline.description" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
                    confirm-button-text='好的'
                    cancel-button-text='不用了'
                    icon="el-icon-info"
                    title="确定创建吗"
                    @confirm="onSubmit"
                    >
                    <template v-slot:reference>
                        <el-button type="primary">创建</el-button>
                    </template>
          </el-popconfirm>
        </el-form-item>
      </el-form>

        <el-card  v-for="o in bank" :key="o.id" style="margin: 5px 0;">
            <template v-slot:header>
                <span>{{o.name}}</span>
                <span style="float: right; padding: 3px 0">
                  <el-button type="primary" @click="getDetail(o.id)">详情</el-button>
                    <el-popconfirm
                              confirm-button-text='好的'
                              cancel-button-text='不用了'
                              icon="el-icon-info"
                              title="确定删除吗"
                              @confirm="toDe(o.id)"
                              >
                              <template v-slot:reference>
                                  <el-button type="danger">删除</el-button>
                              </template>
                    </el-popconfirm>
                </span>
            </template>
            {{o.description}}
        </el-card>
    </div>
</template>
<script setup>
import {reactive, ref, toRaw} from 'vue'
import { useRouter } from "vue-router";
const router = useRouter();
import { useStore } from "vuex"; 
const store = useStore();
import { ElMessage } from 'element-plus'
import {getBankList,createBank,deleteBank} from '@/api/teacher.js'
let bank=ref([])

/**获取数据 */
function getData(){
  getBankList().then((res)=>{
    bank.value=res.data
  })
}
getData()

/**跳转的详情页 */
function getDetail(id){
    router.push({path:`/bank/${id}/`})
}


/**要创建的竞赛信息 */
let formInline=reactive({
  name:'',
  description:''
})
/**创建竞赛 */
function onSubmit(){
  createBank(toRaw(formInline)).then((res)=>{
    ElMessage(res.message)
    getData()
  })
}

function toDe(id){
  deleteBank(id).then((res)=>{
    ElMessage(res.message)
    getData()
  })
}

</script>


<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
<script>
export default {
    name:"BankList",
}
</script>