<template>
    <div class="login">
        <div>
            <el-input v-model="username" placeholder="账户"></el-input>
        </div>
        <div style="margin: 5px 0;"></div>
        <div>
            <el-input  v-model="password" placeholder="密码" show-password></el-input>
        </div>
        <div @click="$router.push({ path: '/reg' })">没有账户,立即注册</div>
        <div>
            <el-radio v-model="type" label="student">学生</el-radio>
            <el-radio v-model="type" label="teacher">老师</el-radio>
        </div>
        <div>
            <el-button round @click="onSubmit">登录</el-button>
        </div> 
    </div>
</template>

<script>
export default {
    name:"Login",
}
</script>
<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex"; 
const router = useRouter();
const store = useStore();
import { ElMessage } from 'element-plus'
import { login } from '@/api/user'

var username=ref('')
var password=ref('')
var type=ref('student')
function onSubmit() {
    login(username.value,password.value,type.value).then((res)=>{
        if(res['message']){
            ElMessage(res['message'])
        }
        else{
            localStorage.setItem('token',res.token)
            store.commit("setIsLogin", true);
            ElMessage({message: '登录成功',type: 'success'})
            if(type.value=='student'){
                localStorage.setItem('type','student')
                store.commit('setType','student')
                router.push({ path: "/student" });
            }
            else{
                localStorage.setItem('type','teacher')
                store.commit('setType','teacher')
                router.push({ path: "/teacher" });
            }
            

        }
        // localStorage.setItem('token','4')
        
    })
}

</script>
<style scoped lang="scss">
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 200px;
    
}
</style>