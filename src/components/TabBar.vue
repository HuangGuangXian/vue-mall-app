<template>
  <van-tabbar route fixed>
    <van-tabbar-item name="home" icon="home-o" to='/'>首页</van-tabbar-item>
    <van-tabbar-item name="search" icon="apps-o" to='/home/classify'>分类</van-tabbar-item>
    <van-tabbar-item
      name="friends"
      icon="cart-o"
      to='/home/shopping'
      :badge="badge"
      id="shop-car"
      >购物车</van-tabbar-item>
    <van-tabbar-item name="setting" icon="user-circle-o" to='/my'>我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>

</style>
