<template>
  <!-- Vue2.0需要根元素，Vue3.0可以是代码片段 Fragment -->
  <div>
    App
    <!-- 1.使用根模块state的数据 -->
    <p>{{$store.state.username}}</p>
    <!-- 2.使用根模块getters的数据 -->
    <p>{{$store.getters.newName}}</p>
    <!-- 俩种写法 -->
    <p>{{$store.getters['newName']}}</p>
    <button @click="mutationsFn">修改数据</button>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    // 使用vuex仓库
    const store = useStore()
    // 1.使用根模块state的数据
    console.log(store.state.username)
    // 2.使用根模块getters的数据
    console.log(store.getters.newName)
    // 3.提交根模块mutations函数
    // store.commit('updateName')
    // 4.调用根模块actions函数
    const mutationsFn = () => {
      store.dispatch('updateName')
    }
    return { mutationsFn }
  }
}
</script>
