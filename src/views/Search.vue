<template>
  <div class="search-container">
      <div class="search-head">
          <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"></van-icon>
          <van-search
            class="search-content"
            v-model="value"
            show-action
            :placeholder="place"
            @search="onSearch"
            @input="input"
            @focus="focus"
          >
            <template #action v-if="showList">
                <div @touchend="onSearch(value)">搜索</div>
            </template>
            <template #action v-else>
                <van-icon
                name="shopping-cart-o"
                id="shop-car"
                class="shop-car"
                :badge="badge"
                @click="$router.push('/home/shopping')"
                 />
            </template>
          </van-search>
      </div>
      <div class="like-search" v-if="likeList.length && showList">
          <van-list>
            <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
                <template>
                    <span class="custom-title" v-html="formatHTML(item)"></span>
                </template>
            </van-cell>
        </van-list>
      </div>
      <div class="goods-list" v-if="!showList">
          <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                :immediate-check="false"
            >
                <GoodsCard
                    v-for="item in goodsList"
                    :key="item.id"
                    v-bind="item"
                    :num="counterMap[item.id]" />
            </van-list>
      </div>
      <div class="history" v-if="likeList.length <= 0 && showList">
          <MyHistory :searchList="searchList" @search="onSearch" />
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoodsCard from '../components/GoodsCard.vue';
import MyHistory from '../components/MyHistory.vue';

export default {
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  components: {
    GoodsCard,
    MyHistory,
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
      badge() {
        const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
        if (count > 99) {
          return '99+';
        }
        return count;
      },
    }),
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  methods: {
    onSearch(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },
    // 防抖
    input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await this.$api.getLikeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
    async onLoad() {
      const value = await this.$api.getSearch(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-container{
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: #fff;
    .search-head{
        width: 345px;
        background-color: #fff;
        margin: 0 auto;
        display: flex;
        align-items: center;
        position: fixed;
        top: 0;
        left: 15px;
        z-index: 22;
        .arr-left{
            font-size: 22px;
        }
        .search-content{
            flex: 1;
            .shop-car{
                font-size: 15px;
            }
        }
    }
    .like-search{
        position: relative;
        top: 50px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
    }
    .goods-list{
        position: relative;
        margin: 48px auto 0;
        width: 345px;
        z-index: 10;
        background-color: #fff;
    }
    .history{
        width: 350px;
        position: absolute;
        top: 35px;
        left: 10px;
        z-index: 1;
    }
}
</style>
