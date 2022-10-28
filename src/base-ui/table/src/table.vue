<!--
 * @Author: Pan Jingyi
 * @Date: 2022-08-15 23:16:44
 * @LastEditTime: 2022-10-01 09:28:52
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
    <!-- 整个数据列表 -->
    <!-- selection-change是官方组件给的性质：当我们的可选框选中后，这个selection-change事件就会收集到哪些框被选中了 -->
    <el-table
      :data="listData"
      border
      class="el-table_body"
      @selection-change="handleSelectChange"
      row-key="id"
      v-bind="childrenProps"
      :tree-props="{ children: 'children' }"
    >
      <!-- 是否显示可勾选框 -->
      <el-table-column
        type="selection"
        min-width="6%"
        v-if="showSelectColumn"
        align="center"
      />
      <!-- 是否显示序号框 -->
      <el-table-column
        label="序号"
        type="index"
        min-width="8%"
        v-if="showIndexColumn"
        align="center"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- scope.row 代表这一行的数据，这个数据原本就有，没必要纠结是从哪来的 -->
            <!-- 这里放一个插槽，默认值就是你原来写的prop属性，但是也可以填自己的，比如时间格式进行转换后再显示 -->
            <!-- 插槽名可以自定义，用来填充自己自定义的内容：比如时间进行修改后再填写，或者这里面填充el-button -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- row=scope.row 将当前属性传给上一层，然后再传给父组件 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <div class="el-pagination">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 50]"
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
import { defineComponent, PropType } from 'vue'
import { ITabelTitle } from '../type/type'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    // 列表数据:是指整个列表真实的数据
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    // 是指列表的框架的数据:比如label,更新时间,创建时间(就是最上面一行的要显示的标签名)
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
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 看选中了哪些可选框
    const handleSelectChange = (value: any) => {
      // 将选中数据的信息传给外面的组件，方便做处理
      emit('selectionChange', value)
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectChange,
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
