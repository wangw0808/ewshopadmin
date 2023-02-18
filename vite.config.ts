import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";
// 需要先下载，在使用
import {resolve} from 'path';
function pathResolve(dir:string){
    // 获取绝对定位的方法
    return resolve(process.cwd(),'.',dir)
}

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
      vue(),
      Components({
        resolvers:[NaiveUiResolver()]
      })
  ],
    resolve:{
      alias:[
          {
              find:'@',
              replacement:(pathResolve('src'))
          }
      ]
    },
    // 设置默认端口
    server:{
      host:'localhost',
        port:8000
    }
})
