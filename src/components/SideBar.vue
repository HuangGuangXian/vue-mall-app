<template>
  <div class='sidebar-container' ref="side">
      <div
        v-for="(item, i) in sideList"
        :key="i"
        :class="{active: index === i}"
        @touchend="scrollTo(i, $event)"
        @touchstart="move = false"
        @touchmove="move = true"
      >{{i == 0 ? '全部' : item}}</div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import tool from '../utils/tool';

export default {
  data() {
    return {
      move: false,
      index: 0,
    };
  },
  computed: {
    ...mapState({
      sideList: (state) => state.sideList,
    }),
  },
  mounted() {
    // this.resetGoodsList();
    // this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;

      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      tool.moveTo(side.scrollTop, sonTop + sonHeight / 2 - pTop - pHeight / 2, side, 'scrollTop');
      // 获取列表页操作
      this.resetGoodsList();
      this.getGoodsList({ type: this.sideList[i], page: 1, sortType: 'all' });
    },
  },
};
</script>

<style lang="less" scoped>
.sidebar-container{
    position: fixed;
    left: 0;
    width: 79px;
    top: 135px;
    bottom: 50px;
    overflow: auto;
    background: #f8f8f8;
    div{
        width: 79px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    .active{
        font-weight: bold;
        color: #ff1a90;
    }
    .active::before{
        position: absolute;
        width: 6px;
        height: 18px;
        background-color: #ff1a90;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        content: '';
    }
}
.sidebar-container::-webkit-scrollbar{
    width: 0px;
    background: none;
}
</style>
