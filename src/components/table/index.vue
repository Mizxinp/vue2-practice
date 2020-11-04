<template>
  <div>
    <z-table :tableData="tableData" :default-sort = "{prop: 'date', order: 'descending'}">
      <z-table-column prop="date" label="日期" sortable></z-table-column>
      <z-table-column prop="name" label="姓名"></z-table-column>
      <z-table-column prop="address" label="地址"></z-table-column>
      <z-table-column prop="operator" label="操作">
        <template v-slot="scope">
          <div v-for="item in scope.column.operator" :key="item">{{item}}</div>
        </template>
      </z-table-column>
    </z-table>
  </div>
</template>

<script>
import ZTable from "./ZTable.vue";
import ZTableColumn from "./ZTableColumn.vue";

export default {
  components: {
    ZTable,
    ZTableColumn
  },
  data() {
    return {
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            operator: '添加',
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            operator: '删除',
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            operator: '修改',
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            operator: '查找',
        }],
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>