<template>
    <div class="reg">

        <div>
            <el-input v-model="username" placeholder="账户"></el-input>
            <div style="margin: 5px 0;"></div>
            <el-input v-model="password" placeholder="密码" show-password></el-input>
            <div style="margin: 5px 0;"></div>
            <el-input v-model="password_two" placeholder="确认密码" show-password></el-input>
        </div>

        <div @click="$router.push({ path: '/login' })">
            已有账户,立即登录
        </div>
        <div>
            <el-button round @click="onSubmit">注册</el-button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { reg } from '@/api/user'
var username=ref('')
var password=ref('')
var password_two=ref('')
const router = useRouter();
function onSubmit() {
    if(password.value===password_two.value){
        reg(username.value,password.value).then((res)=>{
            if(res.status==201){
                ElMessage({message: '注册成功',type: 'success'})
                setTimeout(() => {
                // 注册成功之后 1秒钟 跳转到登录页面
                router.push({ path: "/login" });
                }, 1000);

            }
            if(res['message']){
                ElMessage(res['message'])
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    else{
        ElMessage('两次输入密码不一致')
    }
}
</script>

<style scoped lang="scss">
.reg {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 200px;
}
</style>

<script>
export default {
    name:"Reg",
}
</script>
