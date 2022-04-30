<template>
  <div class="app-header-sticky" :class="{show:y>38}">
      <div class="container" v-show="y>38">
          <RouterLink class="logo" to="/" />
          <AppHeaderNav />
          <div class="left">
              <RouterLink to="/">品牌</RouterLink>
              <RouterLink to="/">专题</RouterLink>
          </div>
      </div>
  </div>
</template>

<script>
// import { onMounted, ref } from '@vue/runtime-core'
import { useWindowScroll } from '@vueuse/core'
import AppHeaderNav from './app-header-nav.vue'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    const { y } = useWindowScroll()
    return { y }
  }
  // vueuse: vueuse.org/core/
  // setup () {
  //   // 记录Y轴卷曲的高度
  //   const y = ref(0)
  //   // 当你页面滚动的时候更新它
  //   onMounted(() => {
  //     window.onscroll = () => {
  //       const scrollTop = document.documentElement.scrollTop
  //       y.value = scrollTop
  //     }
  //   })
  //   // 提供y给模板
  //   return { y }
  // }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    transform: translateY(-100%);
    opacity: 0;
    &.show {
        transform: none;
        opacity: 1;
        transition: all 0.3s linear;
    }
    .container {
        display: flex;
        align-items: center;
    }
    .logo {
        width: 200px;
        height: 80px;
        background: url(../assets/images/logo.png) no-repeat  center -10px ;
        background-size: 100px auto;
    }
    .left {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid @xtxColor;
        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;
            &:hover {
                color: @xtxColor;
            }
        }
    }
}
</style>
