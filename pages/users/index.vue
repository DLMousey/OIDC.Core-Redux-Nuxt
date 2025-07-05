<script setup lang="ts">
import {useFetchConfig} from "#imports";
import ListItem from "~/components/users/ListItem.vue";
import type IUser from "~/data/models/IUser";
import type IAuthRefreshResponse from "~/data/models/IAuthRefreshResponse";
import ErrorCard from "~/components/core/ErrorCard.vue";
import {useFetchWithRefresh} from "~/composables/fetch-refresh";
import {UCheckbox} from "#components";
import type {TableColumn} from "#ui/components/Table.vue";
import {getPaginationRowModel} from "@tanstack/table-core";

const loading = ref(true);
const users = ref(null);

const fetchConfig = useFetchConfig(`/users`, { server: false, lazy: true });
const { data, error } = await useFetchWithRefresh<IUser[]>(fetchConfig.url, fetchConfig.config);

const columns: TableColumn<IUser>[] = [{
  id: 'select',
  header: ({ table }) => h(UCheckbox, {
    'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.getIsAllPageRowsSelected(!!value),
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
  accessorKey: 'username',
  header: 'Username',
  cell: ({ row }) => `${row.getValue('username')}`
}, {
  accessorKey: 'email',
  header: 'Email address',
  cell: ({ row }) => `${row.getValue('email')}`,
  enableSorting: true,
  enableHiding: true
}, {
  accessorKey: 'applications',
  header: 'Published applications',
  cell: ({ row }) => 'TODO: Applications',
  enableSorting: true,
  enableHiding: false
}, {
  accessorKey: 'accessToken',
  header: 'Access Tokens',
  cell: ({ row }) => 'TODO: Access tokens',
  enableSorting: true,
  enableHiding: false
}, {
  id: 'action',
  header: 'Actions'
}];

const table = useTemplateRef('table');
const globalFilter = ref();
const pagination = ref({
  pageIndex: 0,
  pageSize: 10
});

if (data) {
  loading.value = false;
  users.value = data;
}
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Search users..." />
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
        <NuxtLink :to="{ name: 'users-id', params: { id: row.getValue('id') }}">
          <UButton color="neutral" variant="outline">Edit User</UButton>
        </NuxtLink>
      </template>
    </UTable>
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>