<template>
  <!-- 分页器 -->
  <div class="pagination">
    <!-- 上 当当连续分页第一项为1时不能被点击 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="StartAndEnd.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="StartAndEnd.start>2">...</button>
    <!-- 中 -->
    <button
      v-for="(page,index) in StartAndEnd.end"
      v-if="page>=StartAndEnd.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >{{page}}</button>
    <button v-if="StartAndEnd.end<totalPage-1">...</button>
    <!-- 下 -->
    <button v-if="StartAndEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <!-- 当连续分页最后一项为总页数时不能点击 -->
    <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>
    <button style="margin-left:30px">{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continue'],
  computed: {
    // 获得总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    StartAndEnd() {
      // const {continue,pageNo,totalPgae}=this
      let start = 0
      let end = 0
      // 如果连续页码大于总页数
      if (this.continue > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        // 连续页码第一项
        start = this.pageNo - parseInt(this.continue / 2)
        // 连续页码最后一项
        end = this.pageNo + parseInt(this.continue / 2)
        // 如果连续页码第一项小于1
        if (start < 1) {
          start = 1
          end = this.continue
        }
        // 如果连续页码最后一项大于总页数
        if (end > this.totalPage) {
          // 最后一项为总页数,第一项为总页数减去连续页数加1
          end = this.totalPage
          start = this.totalPage - this.continue + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>