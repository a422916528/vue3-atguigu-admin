<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    reqHasTrademark,
    reqAddOrUpdataTrademark,
    reqDeleteTrademark
  } from '@/api/product/trademark/index'
  import type { TrademarkResponseData, Records, Trademark } from '@/api/product/trademark/type'
  import type { UploadProps, FormRules } from 'element-plus'
  onMounted(() => {
    getHasTrademark()
  })
  // import { useUserStore } from '@/stores/user'
  // const userStore = useUserStore()

  // 当前页数
  const pageOn = ref(1)
  // 每页展示多少条数据
  const limit = ref(5)
  // 已有品牌数据总数
  const total = ref(0)
  // 每页展示的已有品牌数据
  const trademarkArr = ref<Records>([])
  // 获取已有品牌方法
  const getHasTrademark = async (page = 1) => {
    pageOn.value = page
    const res: TrademarkResponseData = await reqHasTrademark(page, limit.value)
    if (res.code === 200) {
      total.value = res.data.total
      trademarkArr.value = res.data.records
    }
  }
  // 条/页被点击时
  const sizeChange = (size: number) => {
    limit.value = size
    pageOn.value = 1
    getHasTrademark()
  }
  // 页面数被改变时
  const currentChange = (page: number) => {
    // pageOn.value = page
    getHasTrademark(page)
  }

  // 对话框显示或隐藏控制
  const dialogFormVisible = ref(false)
  // 点击修改按钮
  const updataTrademark = (row: Trademark) => {
    dialogFormVisible.value = true
    ruleForm.value.tmName = row.tmName
    ruleForm.value.logoUrl = row.logoUrl
    ruleForm.value.id = row.id
  }
  // 点击删除按钮
  const deleteTrademark = async (id: number) => {
    const res = await reqDeleteTrademark(id)
    if (res.code === 200) {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    } else {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
    }
    getHasTrademark(trademarkArr.value.length > 1 ? pageOn.value : pageOn.value - 1)
  }
  // 对话框表单校验相关数据
  const ruleForm = ref<Trademark>({
    tmName: '',
    logoUrl: ''
  })
  // 对话框上传图片约束方法 -- 上传图片时触发
  const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
    // 要求：格式为 jpg | png | gif，大小小于 4m
    if (
      rawFile.type === 'image/jpeg' ||
      rawFile.type === 'image/png' ||
      rawFile.type === 'image/gif'
    ) {
      // 格式符合要求
      if (rawFile.size / 1024 / 1024 < 4) {
        // 大小符合要求
        return true
      } else {
        // eslint-disable-next-line no-undef
        ElMessage({
          type: 'error',
          message: '上传文件大小需小于4M'
        })
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'error',
        message: '上传图片的格式为jpg/png/gif'
      })
      return false
    }
  }
  // 图片上传成功钩子
  const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    ruleForm.value.logoUrl = response.data
  }
  // 点击新增品牌按钮
  const addTrademark = () => {
    delete ruleForm.value.id
    ruleForm.value.tmName = ''
    ruleForm.value.logoUrl = ''
    dialogFormVisible.value = true
  }
  // 对话框底部确定按钮点击
  const confirm = async () => {
    // 对整个表单进行校验，如果通过则执行以后的代码
    await ruleFormRef.value.validate()

    const res: any = await reqAddOrUpdataTrademark(ruleForm.value)
    if (res.code === 200) {
      // 添加成功
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'success',
        message: ruleForm.value.id ? '修改成功' : '添加成功'
      })
      getHasTrademark(ruleForm.value.id ? pageOn.value : 1)
      // 添加成功返回第一页
      if (!ruleForm.value.id) {
        pageOn.value = 1
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage({
        type: 'error',
        message: '添加失败'
      })
    }
    dialogFormVisible.value = false
  }
  const ruleFormRef = ref(null)
  // 对话框表单校验规则
  const rules = ref<FormRules<typeof ruleForm>>({
    logoUrl: [
      {
        required: true,
        validator: (rule: any, value: string, callback: any) => {
          if (value) {
            // 图标上传
            callback()
          } else {
            // 图片未上传
            callback(new Error('请上传图片'))
          }
        }
      }
    ],
    tmName: [
      {
        required: true,
        trigger: 'blur',
        validator: (rule: any, value: string, callback: any) => {
          if (value === '') {
            callback(new Error('名称不能为空'))
          } else if (value.length < 2) {
            callback(new Error('长度需大于等于2'))
          } else {
            callback()
          }
        }
      }
    ]
  })
  // 对话框关闭回调
  const closeDialog = () => {
    // 重置表单
    ruleFormRef.value.clearValidate(['tmName', 'logoUrl'])
  }
</script>
<script lang="ts">
  export default {
    name: 'Trademark'
  }
</script>
<template>
  <el-card class="box-card" shadow="hover">
    <el-button type="primary" icon="Plus" @click="addTrademark" v-hasBtn="'btn.Trademark.add'">
      添加品牌
    </el-button>
    <!-- 表格 -->
    <el-table border style="width: 100%; margin-top: 20px" :data="trademarkArr">
      <el-table-column prop="id" label="序号" width="150" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌logo">
        <template v-slot="{ row }">
          <img :src="row.logoUrl" alt="图片丢失" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template v-slot="{ row }">
          <el-popconfirm title="您确定要删除吗？" icon="Delete" @confirm="deleteTrademark(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updataTrademark(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageOn"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout=" prev, pager, next, ->, jumper, sizes, total"
      :total="total"
      style="margin-top: 20px"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </el-card>
  <!-- 对话框，新增，修改时显示 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="ruleForm.id ? '修改商品' : '添加商品'"
    @close="closeDialog"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" style="width: 60%; margin: 0 auto">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input
          placeholder="请输入品牌名称"
          style="width: 60%"
          v-model.trim="ruleForm.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .el-popconfirm__main {
    font-size: 12px;
  }
</style>
