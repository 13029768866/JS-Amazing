<template>
  <div>
    <el-menu  class="el-menu-vertical-demo"  :collapse="isCollapse">
      <template v-if="!isCollapse">
        <div class="fold">
          展开/折叠
          <i class="el-icon-s-fold" @click="isCollapse = true"></i>
        </div>
        <el-tree
                :data="wzjData"
                :expand-on-click-node="false"
                node-key="id"
                highlight-current
        >
          <!--    -->
          <span class="custom-tree-node" slot-scope="{ node, data }" >
        <div
                @click="currentClick(data)"
                class="default"
                :class="act == data.$treeNodeId?'act':null "
                :title="node.label"
        >{{ node.label }}</div>
      </span>
        </el-tree>
      </template>
      <template v-if="isCollapse">
        <div class="shousuo">
          <i class="el-icon-s-unfold" @click="isCollapse = false"></i>
        </div>
      </template>
    </el-menu>
  </div>

</template>

<script>
  export default {
    name: "WzjWorkTree",
    props:{
      data:{
        type: Array,
        default:() => []
      }
    },
    data(){
      return {
        wzjData: [],
        act: 1,
        isCollapse: false
      }
    },
    watch:{
      data(){
        this.dataChange()
      }
    },
    methods:{
      /* 数据改变触发 */
      dataChange(){
        let AllData = _.cloneDeep(this.data);
        let treeMap = AllData.reduce((memo,current) => {
          current.label = current.name
          memo[current['id']] = current
          return memo
        },{})
        console.log(treeMap)
        let resArr = [];
        let res = AllData.reduce((memo, current) => {
          let pid = current.pid;
          let parent = treeMap[pid];

          if (parent) {
            parent.children
                ? parent.children.push(current)
                : (parent.children = [current]);
          } else if (pid === 0) {
            resArr.push(current);
          }
          return resArr;
        }, []);
        this.wzjData = res;
      },
      currentClick(data){
        console.log(data);
        this.act = data.$treeNodeId
      }

    },
    mounted() {
      this.dataChange()

    }
  }
</script>

<style scoped>

  .el-menu--collapse{
    width: 28px;
    border-color: red;
  }
  .fold{
    box-sizing: border-box;
    width: 202px;
    height: 32px;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    border: 1px solid #000;
  }
  .shousuo{
    width:26px;
    text-align: center;
    height:95vh;
    background:rgba(255,255,255,1);
    border:1px solid rgba(232,236,239,1);
  }
  .fold i,
  .shousuo i {
    cursor: pointer;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .default{
    width: 174px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 40px;
  }
  .el-tree-node__children .default{
    width: 138px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 40px;
  }
  .act{
    color: skyblue;
  }
  .custom-tree-node {

    font-size: 14px;
  }
  .el-tree {
    border: 1px solid #000;
    width: 200px;
    height: 90vh;
    overflow: hidden;
    margin-top: 0;
  }
  .el-tree .el-tree-node__content {
    /*height: 32px;
    line-height: 32px;*/
  }
</style>
