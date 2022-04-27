<template>
  <div class="history-container">
      <h4>历史记录：</h4>
      <div class="history-item"
        v-for="item in searchList"
        :key="item.time"
        @click="search(item.value)"
      >{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      default() {
        return [];
      },
    },
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang='less' scoped>
.history-container{
    .history-item{
        padding: 15px;
        background-color: #eee;
        border-radius: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
        display: inline-block;
    }
    h4{
        color: #aaa;
    }
}

</style>
