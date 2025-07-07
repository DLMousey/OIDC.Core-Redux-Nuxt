<script async setup lang="ts">
import {useFetch, useFetchConfig} from "#imports";
import ListItem from "~/components/applications/ListItem.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";
import type {TableColumn} from "#ui/components/Table.vue";
import {UCheckbox, ULink} from "#components";
import type IApplication from "~/data/models/IApplication";
import { getPaginationRowModel } from "@tanstack/table-core";

const router = useRouter();
const loading = ref(true);
const fetchConfig = useFetchConfig(`/applications`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh(fetchConfig.url, fetchConfig.config);

const columns: TableColumn<IApplication>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
    'aria-label': 'Select all'
  }),
  cell: ({ row }) => h(UCheckbox, {
    'modelValue': row.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
    'aria-label': 'Select row'
  }),
  enableSorting: false,
  enableHiding: true
}, {
  accessorKey: 'id',
  header: 'ID (GUID)',
  cell: ({ row }) => `${row.getValue('id')}`
}, {
  accessorKey: 'name',
  header: 'Application Name',
  cell: ({ row }) => `${row.getValue('name')}`,
  enableSorting: true,
  enableHiding: true
}, {
  accessorKey: 'description',
  header: 'Description',
  cell: ({ row }) => `${row.getValue('description')}`,
  enableSorting: false,
  enableHiding: true
}, {
  id: 'homepage',
  header: 'Homepage URL',
  cell: ({ row }) => row.getValue('homepageUrl')
}, {
  id: 'callback',
  header: 'Callback URL',
  cell: ({ row }) => row.getValue('callbackUrl')
}, {
  accessorKey: 'clientId',
  header: 'Client ID',
  cell: ({ row }) => `${row.getValue('clientId')}`,
  enableSorting: false,
  enableHiding: true
}, {
  accessorKey: 'created',
  header: 'Creation Date',
  cell: ({ row }) => {
    return new Date(row.getValue('created')).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    })
  }
}, {
  id: 'action',
  header: 'Actions'
}];

const table = useTemplateRef('table');
const globalFilter = ref();
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})

console.log(data, error);
if (data) {
  loading.value = false;
}
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Search applications..." />
    </div>
    <UTable ref="table"
            v-model:global-filter="globalFilter"
            v-model:pagination="pagination"
            :pagination-options="{getPaginationRowModel: getPaginationRowModel()}"
            :data="data"
            :columns="columns"
            sticky
            class="h-96"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
      <template #action-cell="{ row }">
        <NuxtLink :to="{ name: 'applications-id', params: { id: row.getValue('id') }}">
          <UButton color="neutral" variant="outline">Edit Application</UButton>
        </NuxtLink>
      </template>
      <template #homepage-cell="{ row }">
        <a :href="row.original.homepageUrl">{{ row.original.homepageUrl }}</a>
      </template>
      <template #callback-cell="{ row }">
        <a :href="row.original.callbackUrl">{{ row.original.callbackUrl }}</a>
      </template>
    </UTable>
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.table {
  width: 100%;

  tbody > tr {
    cursor: pointer;
  }
}
</style>