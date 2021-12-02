<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td>
        <base-checkbox v-model="row.done"> </base-checkbox>
      </td>
      <td>
        <p class="title">{{ row.title }}</p>
        <p class="text-muted">{{ row.description }}</p>
      </td>
      <td class="td-actions text-right">
        <base-button type="link" aria-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </td>
    </template>
  </base-table>
</template>
<script>
import { BaseTable } from "../BaseTable";
export default {
  components: {
    BaseTable,
  },
  computed: {
    tableData() {
      return "dashboard.taskList";
    },
  },
};
</script>
<style>
</style>
