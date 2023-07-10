<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    reqAllTrademark,
    reqSpuImageList,
    reqSpuSaleAttr,
    reqAllSaleAttr,
    reqAddOrUpdateSpu
  } from '@/api/product/spu/index'
  import {
    SPUData,
    TrademarkData,
    SpuImageData,
    SaleAttrData,
    HasSaleAttr
  } from '@/api/product/spu/type'
  const emit = defineEmits(['changeScene'])
  // 点击取消按钮
  const cancel = () => {
    emit('changeScene', 0)
  }
  // 存储品牌
  const trademark = ref<TrademarkData[]>([])
  // 存储照片墙
  const imageList = ref<SpuImageData[]>([])
  // 存储销售属性
  const saleAttr = ref<SaleAttrData[]>([])
  // 存储全部销售属性
  const allSaleAttr = ref<HasSaleAttr[]>([])
  // 存储还未选择的销售属性 id 和值
  const unSaleAttrIdAndValue = ref('')
  // 存储已有的 SPU 对象
  const spuParams = ref<SPUData>({
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: []
  })
  // 获取父组件的 SPU 数据
  const initSpuData = async (spu: SPUData) => {
    // spu: 父组件 spu 对象，不完整
    spuParams.value = spu
    // 获取全部品牌数据
    const res = await reqAllTrademark()
    trademark.value = res.data
    // 获取某一个 SPU 下全部商品的图片数据
    const res1 = await reqSpuImageList(spu.id as number)
    imageList.value = res1.data.map(item => {
      return {
        name: item.imgName,
        url: item.imgUrl
      }
    })
    // 获取 SPU 下已有的销售属性数据
    const res2 = await reqSpuSaleAttr(spu.id as number)
    saleAttr.value = res2.data
    // 获取全部的销售属性[颜色、版本、尺码]
    const res3 = await reqAllSaleAttr()
    allSaleAttr.value = res3.data
  }
  // 添加 SPU 初始化
  const initAddSpu = async (c3Id: number) => {
    // 先清空数据
    Object.assign(spuParams.value, {
      category3Id: '', //收集三级分类的ID
      spuName: '', //SPU的名字
      description: '', //SPU的描述
      tmId: '', //品牌的ID
      spuImageList: [],
      spuSaleAttrList: []
    })
    // 清空照片墙
    imageList.value = []
    // 清空销售属性
    saleAttr.value = []
    // 清空 id
    spuParams.value.id = ''
    spuParams.value.category3Id = c3Id
    console.log(123)
    // 获取全部品牌数据
    const res = await reqAllTrademark()
    trademark.value = res.data
    // 获取全部的销售属性[颜色、版本、尺码]
    const res3 = await reqAllSaleAttr()
    allSaleAttr.value = res3.data
  }
  // 控制照片墙预览图片显示或者隐藏
  const dialogVisible = ref(false)
  // 存储预览图片的地址
  const dialogImageUrl = ref('')
  // 照片墙点击预览钩子函数
  const handlePictureCardPreview = file => {
    dialogVisible.value = true
    dialogImageUrl.value = file.url
  }
  // 照片墙删除文件钩子
  const handleRemove = () => {
    console.log('删除成功')
  }
  // 照片墙上传文件前的钩子
  const handleBefore = (file: any) => {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
      if (file.size / 1024 / 1024 < 3) {
        return true
      } else {
        // eslint-disable-next-line no-undef
        ElMessage.error('文件大小超过3M')
      }
    } else {
      // eslint-disable-next-line no-undef
      ElMessage.error('只能上传格式为：jpg, png, gif')
      return false
    }
  }
  // 计算还未拥有的销售属性
  const unSaleAttr = computed(() => {
    return allSaleAttr.value.filter(item => {
      return saleAttr.value.every(val => {
        return item.name !== val.saleAttrName
      })
    })
  })
  // 添加销售属性按钮的回调
  const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = unSaleAttrIdAndValue.value.split(':')
    const newSaleAttr: SaleAttrData = {
      baseSaleAttrId,
      saleAttrName,
      spuSaleAttrValueList: []
    }
    // 追加到属性数组当中
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数据
    unSaleAttrIdAndValue.value = ''
  }
  // 属性值点击添加按钮的回调
  const toEdit = (row: SaleAttrData) => {
    row.flag = true
    // 收集填写的属性值
    row.saleAttrValue = ''
  }
  // 添加属性值失去焦点的回调
  const toLook = (row: SaleAttrData) => {
    // 非法判断
    if (row.saleAttrValue.trim() === '') {
      return ElMessage({
        type: 'warning',
        message: '属性值不能为空'
      })
    }
    if (row.spuSaleAttrValueList.find(item => item.saleAttrValueName === row.saleAttrValue)) {
      row.saleAttrValue = ''
      return ElMessage({
        type: 'warning',
        message: '属性值不能重复'
      })
    }
    // 按照接口要求收集数据
    row.spuSaleAttrValueList.push({
      baseSaleAttrId: row.baseSaleAttrId,
      saleAttrValueName: row.saleAttrValue
    })
    row.flag = false
  }
  // 保存按钮的回调
  const save = async () => {
    // 整理参数
    // 照片墙数据
    spuParams.value.spuImageList = imageList.value.map((item: any) => {
      return {
        imgName: item.name,
        imgUrl: item.response?.data || item.url
      }
    })
    // 销售属性数据
    spuParams.value.spuSaleAttrList = saleAttr.value
    // 发接口请求
    const res = await reqAddOrUpdateSpu(spuParams.value as any)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: spuParams.value.id ? '修改成功' : '添加成功'
      })
    } else {
      ElMessage({
        type: 'success',
        message: spuParams.value.id ? '修改失败' : '添加失败'
      })
    }
    // 通知父组件切换场景
    emit('changeScene', 0)
  }
  defineExpose({
    initSpuData,
    initAddSpu
  })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" width="100" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in trademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imageList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handleBefore"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :placeholder="unSaleAttr.length ? `还存在${unSaleAttr.length}个未选` : '无'"
        v-model="unSaleAttrIdAndValue"
      >
        <el-option
          :label="item.name"
          v-for="item in unSaleAttr"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        style="margin-left: 10px"
        :disabled="!unSaleAttrIdAndValue"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin-top: 20px" :data="saleAttr">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="销售属性名字" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值">
          <template v-slot="{ row }">
            <el-tag
              v-for="(tag, index) in row.spuSaleAttrValueList"
              :key="tag.id"
              class="mx-1"
              closable
              :type="tag.type"
              style="margin-right: 10px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              ref="InputRef"
              v-model.trim="row.saleAttrValue"
              class="ml-1 w-20"
              size="small"
              @keyup.enter="toLook(row)"
              @blur="toLook(row)"
              style="width: 100px"
              placeholder="请输入属性值"
            />
            <el-button
              v-else
              class="button-new-tag ml-1"
              size="small"
              @click="toEdit(row)"
              icon="Plus"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save" :disabled="saleAttr.length === 0">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  .el-input {
    width: 203px;
  }
</style>
