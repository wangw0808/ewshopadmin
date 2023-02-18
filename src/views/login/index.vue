<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo m-0">
          <img class="m-auto" style="margin: auto" src="@/assets/images/logo.png" alt="" />
        </div>
      </div>
      <div class="view-account-form">
        <n-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" placeholder="用户名:super@a.com">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="密码:123123"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,reactive} from "vue";
import {PersonOutline,LockClosedOutline} from "@vicons/ionicons5"
import {useUserStore} from "@/store/user";
import {useRouter} from "vue-router";
import { useMessage } from 'naive-ui';

const formRef = ref();
// 如果loading是一个true的话，就会在登陆的时候有一个加载的状态
const loading = ref(false);
// 把user里面的userUserStore方法值赋值给usestore
const userStore = useUserStore();
const router = useRouter();
const message = useMessage();
// 是一个全局变量
(<any>window).$message = useMessage();
// (<any>window).$message = useMessage();
    // 定义一个接口
    interface FormState {
      // 属性类型
      email:string,
      password:string,
    }

    // 定义数据模型
    const formInline = reactive({
      username:'super@a.com',
      password:'123123',
    })

      // 验证规则
    const rules = {
      // 失去焦点时触发显示的数据
      username:{required:true,message:'请输入用户名',trigger:'blur'},
      password:{required:true,message:'请输入密码',trigger: 'blur'},
    }

    // 点击登录事件
    const handleSubmit = () => {
      // 打印出定义的数据模型
      console.log(formInline)

      // 表单验证
      formRef.value.validate(async (errors:any) => {
        console.log(!errors)
        if(!errors){
          // 有错误就返回，不执行，不在往下发送请求
          // return
          // 接收数据
          // 从frominline里面解构出来username，password
          const {username,password} = formInline;
          // 显示登录中
          loading.value = true;
          // 调整数据结构
          // params对象的类型是formstate接口里面设置的类型
          const params:FormState = {
            //必须具有formstate接口里面的所有属性和方法
            email:username,
            password,//password:password简写为password
          };
          try{
            // 执行登陆操作
            console.log(params)
            // res是userStore里面返回的数据，userstore是导入并定义的值
            // params传递给store/user里面的login方法
            userStore.login(params).then(_res => {
              console.log(_res);
              // 关闭窗口
              // Comment(res);
              // loading的值设置为false
              loading.value = false;
              // 提示登陆成功
              message.success('登陆成功')
              // 跳转到首页
              router.push({name:'dashboard'});
            }).catch(()=>{
              loading.value = false
            })
            // 成功后跳转
            // 失败后提示
          }finally{
            loading.value = false;
          }
        }else{
          // message.error('请填写完整的信息，并且进行验证码校验')
        }
      })
    }
</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>