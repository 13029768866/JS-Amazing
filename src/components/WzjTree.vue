<template>
  <el-tree
    :data="allData"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="render"
  ></el-tree>
</template>

<script type="text/jsx">
import _ from "lodash";
export default {
  name: "WzjTree",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fileDrop: Array,
    diectoryDrops: Array,
    delete:Function
  },
  data() {
    return {
      allData: [],
      currentId:"",  // 当前编辑id
      currentContent:"" // 当前编辑内容
    };
  },
  watch: {
    /* 数据更新就需要重新渲染 */
    data() {
      this.updateData();
    }
  },
  methods: {
    ok(data){
      let list = _.cloneDeep(this.data);
      let item = list.find(item =>item.id === data.id);
      this.currentId = '';
      item.name = this.currentContent
      this.$emit('update:data',list);
    },
    cancel(){
      this.currentId = ''
    },
    handleInput(val){
      this.currentContent = val;
    },
    isParent(data) {
      return data.type === "parent";
    },
    handleRename(data){ // 重命名
      console.log(1);
      this.currentId = data.id;
      this.currentContent = data.name;
    },
    remove(id){ // 删除页面中内容
      let list = _.cloneDeep(this.data);
      list = list.filter(item =>item.id !== id);
      console.log(list);
      this.$emit('update:data',list);
      /*this.$message({
        type: 'success',
        message: '删除成功!'
      });*/
    },
    handleRemoveFile(data){ // 删除
      this.$confirm(`此操作将永久删除该文件${data.name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('wzj');
        this.remove(data.id);
        /* 用户传递delete方法调用接口,没有直接删除 */
        /*this.delete?this.delete(data.id).then(()=>{
          this.remove(data.id);
        }):this.remove(data.id);*/

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleCommand(data,val){
      console.log(data,val);
      if(val === 'rn'){
        this.handleRename(data)
      }else if(val === 'rm'){
        this.handleRemoveFile(data)
      }
    },
    /*
     *  通过node.expanded判断是否展开
     * */
    render(h, { node, data, store }) {
      let list = this.isParent(data) ? this.diectoryDrops : this.fileDrop;
      return (
        <div style={{ width: "100%"}}>
          {this.isParent(data) ? (
            node.expanded ? (
              <i class="el-icon-folder-opened"></i>
            ) : (
              <i class="el-icon-folder"></i>
            )
          ) : (
            <i class="el-icon-document"></i>
          )}
          {/*修改名字*/}
          {data.id === this.currentId?<el-input on-input={this.handleInput} size="mini" value={this.currentContent}></el-input>:data.name}


          {/*bind绑定是会把原来的参数向后移*/}
          {
            data.id !== this.currentId?
                <el-dropdown placement="bottom" trigger="click" on-command={
                  this.handleCommand.bind(this, data)
                }>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
                  <el-dropdown-menu slot="dropdown">
                    {list.map(item => (
                        <el-dropdown-item command={item.text}>{item.value}</el-dropdown-item>
                    ))}
                  </el-dropdown-menu>
                </el-dropdown>
                : <span style={{float:'right'}}>
                  <el-button type="text" on-click={this.ok.bind(this,data)}>确认</el-button>
                  <el-button type="text" on-click={this.cancel}>取消</el-button>
                </span>


          }
        </div>
      );
    },
    updateData() {
      console.log(this.data);
      /* 创造映射表 */
      /* 子组件不能直接修改父组件数据,引入loadsh帮助克隆 */
      let AllData = _.cloneDeep(this.data);
      let treeMap = AllData.reduce((memo, current) => {
        // current.label = current.name;
        memo[current["id"]] = current;
        return memo;
      }, {});
      /*console.log(treeMap);*/
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
      this.allData = res;
    }
  },
  mounted() {
    this.updateData();
  }
};
</script>

<style>
.el-tree {
  width: 350px;
  margin-top: 15px;
}
.el-dropdown {
  float: right;
}
.el-tree .el-tree-node__content {
  height: 32px;
  line-height: 40px;
}
.el-tree .el-input{
  width: 50%;
}
</style>
