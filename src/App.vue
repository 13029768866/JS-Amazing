<template>
  <div id="app">
    <!--<wzj-tree
      :data.sync="treeData"
      :fileDrop="fileDrop"
      :diectoryDrops="diectoryDrops"
      :delete="deleteFn"
    ></wzj-tree>
-->
<!--    <Menu></Menu>-->
    <!-- 工作侧边栏组件改造 -->
    <wzj-work-tree
      :data.sync="treeData"
    ></wzj-work-tree>
    <!--<ell-tree
    ></ell-tree>-->
  </div>
</template>

<script>
import { getTreeList } from "./api";
import WzjTree from "./components/WzjTree";
import Menu from "./components/Menu";
import WzjWorkTree from "./components/WzjWorkTree";
import ellTree from "./components/elTree";
export default {
  components: {
    WzjTree,
    Menu,
    WzjWorkTree,
    ellTree
  },
  data() {
    return {
      treeData: [],
      fileDrop:[
        {text:'rm',value: '删除文件'}
      ],
      diectoryDrops:[
        {text:'rn',value:'修改名字'},
        {text:'rm',value:'删除文件夹'},
      ]
    };
  },
  methods:{
    deleteFn(id){
      // 调用接口删除
    }
  },
  async mounted() {
    let { data } = await getTreeList();
    /* 扁平数据处理成多层数据 */
    data.parent.forEach(p => p.type = 'parent');
    this.treeData = [...data.parent, ...data.child];
    // console.log(this.treeData);
  }

};
</script>

<style></style>
