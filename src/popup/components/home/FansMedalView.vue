<template>
  <div class="fans-wrapper">
    <el-table>
      <el-table-column
        label="房间号"
        prop="rid">
      </el-table-column>
      <el-table-column
        label="总亲密度"
        prop="rid">
      </el-table-column>
      <el-table-column
        label="设置"
        prop="setting">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
  .row-title {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }

  .margin_top_15 {
    margin-top: 15px;
  }
</style>