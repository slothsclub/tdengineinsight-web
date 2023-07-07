<script setup>
import {onMounted, ref} from "vue";
import {useQueryBuilderStore} from "../../store/query-builder.js";
import {useTagStore} from "../../store/tag.js";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";
import useQueryBuilder from "../../support/query-builder.js";

const queryBuilderStore = useQueryBuilderStore()
const tagStore = useTagStore()
const {addTagClause, removeTagClause} = useQueryBuilder()

const filterOption = (input, option) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
}
</script>

<template>
  <a-row class="tag-clause-container" :gutter="[0, 10]">
    <a-col :span="24">
      <a-row :gutter="[10, 10]">
        <a-col :span="8" v-for="clause in queryBuilderStore.whereTagClause.tags">
          <a-space>
            <a-input-group compact>
              <a-select v-model:value="clause.name" class="tag-selector">
                <a-select-option :value="tag.tagName" v-for="tag in tagStore.allTags.items">{{ tag.tagName }}
                </a-select-option>
              </a-select>
              <a-select v-model:value="clause.operator">
                <a-select-option value="=">=</a-select-option>
                <a-select-option value="like">Like</a-select-option>
              </a-select>
              <a-auto-complete
                  v-model:value="clause.value"
                  :options="tagStore.valuesGroupByName[clause.name]"
                  style="min-width: 200px"
                  placeholder=""
                  :filter-option="filterOption"
              />
            </a-input-group>
            <a-button size="small" type="link" danger @click="removeTagClause(index)">
              <template #icon>
                <DeleteOutlined/>
              </template>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-col>
    <a-col :span="24">
      <a-button shape="round" size="small" @click="addTagClause">
        <template #icon>
          <PlusOutlined/>
        </template>
      </a-button>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-input-group-compact {
  display: flex;
}

.tag-clause-container {
  width: 1200px;

  .tag-selector {
    min-width: 100px;
  }

  .ant-input {
    width: 200px;
  }
}
</style>
