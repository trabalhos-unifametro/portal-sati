<script setup lang="ts">
import {onMounted, useSlots, ref, type Ref, type UnwrapRef, type ComputedRef, computed} from "vue";
import DataTableRow from "@/components/DataTableRow.vue";

const slots = useSlots()
interface THead {
  label: string
  key: string
  class?: string
}

const keys: Ref<UnwrapRef<any[]>> = ref([])

const props = defineProps({
  headers: {
    type: Array<THead>,
    required: true
  },
  items: {
    type: Array<any>,
    required: true
  },
  currentPage: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 10
  }
})

const items: ComputedRef<Array<any>> = computed(() => {
  const start = (props.currentPage - 1) * props.perPage;
  const end = props.currentPage * props.perPage;
  return props.items.slice(start, end);
})

onMounted(() => {
  if (props.headers) {
    for(const th of props.headers) {
      keys.value.push(th.key)
    }
  }
})

</script>

<template>
  <div class="w-100">
    <table class="table table-striped v-table">
      <thead>
        <tr>
          <th v-for="(th, key) in props.headers" :key="`th-${key}`"> {{ th.label }} </th>
        </tr>
      </thead>
      <tbody>
        <data-table-row v-for="(td, key) in items" :key="`td-${key}`"
          :item="td"
          :index="key"
          :keys="keys"
        >
          <td v-for="(field, i) in keys" :key="`td-${i}`">
            <div v-if="slots[field]" class="d-flex justify-content-center align-items-center w-100 h-100">
              <slot :name="field" :index="key" :field="field" :item="td"></slot>
            </div>
            <span v-else>
              {{ td[field] ?? 'undefined' }}
            </span>
          </td>
          <template #row-details="{ item, index }">
            <slot name="row-details" :item="item" :index="index"></slot>
          </template>
        </data-table-row>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .table {
    &.v-table {
      border-radius: 5px;
      margin-bottom: 0;

      thead {
        tr {
          th {
            background-color: #1C6F77;
            color: #fff;
            vertical-align: middle;
            text-align: center;
            padding: 15px 5px;

            &:first-child {
              border-radius: 5px 0 0 0;
            }

            &:last-child {
              border-radius: 0 5px 0 0;
            }

            &:not(:last-child) {
              border-right: 1px solid rgba(0,0,0,0.2);
            }
          }
        }
      }

      tbody {
        tr {
          border-bottom-color: transparent;
          border-radius: 10px;

          td {
            vertical-align: middle;
            text-align: center;
            border-right: 1px solid rgba(0,0,0,0.2);
            padding: 10px 5px;

            &:first-child {
              border-left: 1px solid rgba(0,0,0,0.2);
            }
          }

          &:last-child {
            td {
              border-bottom: 1px solid rgba(0,0,0,0.3);
              border-radius: 0 0 5px 5px;
            }
          }
        }
      }
    }
  }
</style>