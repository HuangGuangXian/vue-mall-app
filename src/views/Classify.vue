<template>
  <div class="classify-container">
    <!-- 搜索框 -->
    <router-link class="search-btn" tag="div" to="/search">
      <van-icon name="search" />
      <div class="search-font">苹果特价1元1斤</div>
    </router-link>
    <!-- 一级导航 -->
    <OneTab />
    <!-- 二级导航 -->
    <template v-if="showContent" >
      <SideBar />
      <GoodsList />
    </template>
    <!-- 加载组件 -->
    <van-loading size="2rem" vertical v-else/>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import OneTab from '../components/OneTab.vue';
import SideBar from '../components/SideBar.vue';
import GoodsList from '../components/GoodsList.vue';

export default {
  components: {
    OneTab,
    SideBar,
    GoodsList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.classify-container{
  width: 375px;
  .search-btn{
    width: 355px;
    height: 33px;
    line-height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #a1a1a1;
    >* {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
