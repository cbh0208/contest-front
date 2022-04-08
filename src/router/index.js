import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/profile/Login.vue'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/reg',
    name:'reg',
    component:()=>import('../views/profile/Reg.vue'),
    meta:{
      title:'注册'
    },

  },
  {
    path:'/student',
    name:'student',
    component:()=>import('../views/home/Student.vue'),
    meta:{
      title:'学生主页',
      isAuthRequired: true,
    }
  },
  {
    path:'/teacher',
    name:'teacher',
    component:()=>import('../views/home/Teacher'),
    meta:{
      title:'教师主页',
      isAuthRequired: true,
    }

  },
  {
    path:'/bank/:id/',
    name:'bank',
    component:()=>import('../views/teacher/Bank.vue'),
    meta:{
      title:'题库',
      isAuthRequired: true,
    }
  },
  {
    path:'/question_add/:id/',
    name:'question_add',
    component:()=>import('../views/teacher/QuestionAdd.vue'),
    meta:{
      title:'添加题目',
      isAuthRequired: true,
    }
  },
  {
    path:'/CreateContest/',
    name:'CreateContest',
    component:()=>import('../views/teacher/CreateContest.vue'),
    meta:{
      title:'创建竞赛',
      isAuthRequired: true,

    }
  },
  {
    path:'/contest/:id/',
    name:'question',
    component:()=>import('../views/student/Contest.vue'),
    meta:{
      title:'竞赛',
      isAuthRequired: true,
    }
  }
  

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){
    console.log(789);
    return next('/login')
  }
  else{
    next()
  }
  document.title = to.meta.title;
})

export default router
