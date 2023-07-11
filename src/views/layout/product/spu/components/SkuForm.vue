<!-- eslint-disable no-undef -->
<script setup lang="ts">
  import { ref } from 'vue'
  import { SPUData } from '@/api/product/spu/type'
  import { reqAttr } from '@/api/product/attr/index'
  import { reqSpuImageList, reqSpuSaleAttr } from '@/api/product/spu/index'
  import { reqAddSku } from '@/api/product/spu/index'
  import type { ResSkuData } from '@/api/product/spu/type'
  const emit = defineEmits(['changeScene'])
  // 点击取消按钮的回调
  const cancel = () => {
    // 通知父组件切换场景
    emit('changeScene', 0)
  }
  // 存储平台属性
  const attrArr = ref([])
  // 存储销售属性
  const saleArr = ref([])
  // 存储照片数据
  const imgArr = ref([])
  // 发送给服务器的参数
  const skuParams = ref<ResSkuData>({
    category3Id: '', //三级分类的ID
    spuId: '', //已有的SPU的ID
    tmId: '', //SPU品牌的ID
    skuName: '', //sku名字
    price: '', //sku价格
    weight: '', //sku重量
    skuDesc: '', //sku的描述
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '' // sku 图片地址
  })
  // 初始化 SKU 数据
  const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SPUData) => {
    skuParams.value.category3Id = spu.category3Id
    skuParams.value.spuId = spu.id
    skuParams.value.tmId = spu.tmId
    // 调接口发请求
    // 获取平台属性
    const res = await reqAttr(c1Id, c2Id, spu.category3Id)
    attrArr.value = res.data
    // 获取销售属性
    const res1 = await reqSpuSaleAttr(spu.id as number)
    saleArr.value = res1.data
    // 获取照片墙的数据
    const res2 = await reqSpuImageList(spu.id as number)
    imgArr.value = res2.data
  }
  // 获取组件实例
  const tableRef = ref(null)
  // 点击设置默认按钮的回调
  const setDefault = (row: any) => {
    skuParams.value.skuDefaultImg = row.imgUrl
    // 勾选复选框
    // 先取消所有的勾选
    imgArr.value.forEach(item => {
      tableRef.value.toggleRowSelection(item, false)
    })
    tableRef.value.toggleRowSelection(row, true)
  }
  // 保存按钮的回调
  const save = async () => {
    // 整理参数
    // 平台属性
    attrArr.value.forEach(item => {
      if (item.attrIdAndValueId) {
        const [attrId, valueId] = item.attrIdAndValueId.split(':')
        skuParams.value.skuAttrValueList.push({
          attrId,
          valueId
        })
      }
    })
    // 销售属性
    skuParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev, next) => {
      if (next.saleIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId
        })
      }
      return prev
    }, [])
    // 发送请求
    const res: any = await reqAddSku(skuParams.value)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '添加成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: '添加失败'
      })
    }
    // 通知父组件切换场景
    emit('changeScene', 0)
  }
  defineExpose({
    initSkuData
  })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="请输入价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input placeholder="请输入重量(克)" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="请输入描述信息" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="100px">
        <el-form-item
          style="margin-bottom: 10px"
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="val in item.attrValueList"
              :key="val.id"
              :label="val.valueName"
              :value="`${item.id}:${val.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="val in item.spuSaleAttrValueList"
              :key="val.id"
              :label="val.saleAttrValueName"
              :value="`${item.id}:${val.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="tableRef">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template v-slot="{ row }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" @click="setDefault(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
