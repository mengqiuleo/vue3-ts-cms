<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 23:16:44
 * @LastEditTime: 2022-08-17 00:40:38
-->
<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      class="el-table_body"
      @selection-change="handleSelectChange"
    >
      <el-table-column
        type="selection"
        min-width="6%"
        v-if="showSelectColumn"
        align="center"
      />
      <el-table-column
        label="序号"
        type="index"
        min-width="8%"
        v-if="showIndexColumn"
        align="center"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <div class="el-pagination">
          <el-pagination
            :currentPage="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30]"
            small="false"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ITabelTitle } from '../type/type'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<ITabelTitle[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectChange = (value: any) => {
      emit('selectionChange', value)
    }

    const currentPage4 = ref(4)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleCurrentChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectChange,
      currentPage4,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="less" scoped>
.my-table {
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .el-table_body {
    width: 100%;
    font-size: 10px;
  }

  .footer {
    margin-top: 20px;
    justify-content: flex-end;

    .el-pagination {
      justify-content: flex-end;
    }
  }
}
</style>
