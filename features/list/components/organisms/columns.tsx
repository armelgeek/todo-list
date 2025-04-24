'use client';
  
  import { ColumnDef } from '@tanstack/react-table';
  
  import type { List } from '@/features/list/config/list.type';
  
  import { DataTableRowActions } from './data-table-row-actions';
  import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';
  
  export const columns: ColumnDef<List>[] = [
    {
      id: 'name',
      meta: 'Name',
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
        />
      ),
      cell: ({ row }) => {
        return <div className="flex w-full">{row.getValue('name')}</div>;
      },
    },
    {
      id: 'actions',
      maxSize: 75,
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
  