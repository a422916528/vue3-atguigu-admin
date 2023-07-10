<script setup lang="ts">
  import {} from 'vue'
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="请输入SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量(克)"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="请输入重量(克)" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机一级">
          <el-select>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
            <el-option label="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select>
        <el-option label="1"></el-option>
        <el-option label="1"></el-option>
        <el-option label="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
