'use client';
import * as React from 'react';
import { CompleteOrders } from './CompleteOrder';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal, CheckCheck, X, CirclePlus } from 'lucide-react';

import { Button } from 'Components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'Components/ui/dropdown-menu';
import { CancelOrder } from './CancelOrder';
import { ConfirmOrder } from './ConfirmOrder';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'Components/ui/table';

export const columns = [
  {
    accessorKey: 'id',
    header: 'Stt',
    cell: ({ row }) => <div className='capitalize  font-mainText3 '>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'idOrder',
    header: 'ID đơn hàng',
    cell: ({ row }) => <div className='capitalize  font-mainText3 '>{row.getValue('idOrder')}</div>,
  },
  {
    accessorKey: 'product',
    header: 'Sản phẩm',
    cell: ({ row }) => <div className='capitalize  font-mainText3 '>{row.getValue('product')}</div>,
  },

  {
    accessorKey: 'total',
    header: 'Tổng giá',
    cell: ({ row }) => (
      <div className='font-bold font-mainText3  '>{row.getValue('total')} vnđ</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const statuss = row.getValue('status');
      const statusText =
        statuss === 'Processing'
          ? 'Đang xử lí'
          : statuss === 'Processed'
          ? 'Đã xử lý'
          : statuss === 'Cancelled'
          ? 'Đã hủy'
          : statuss === 'Completed'
          ? 'Hoàn thành'
          : statuss === 'In Transit'
          ? 'Đang vận chuyển'
          : statuss;
      const statusClass =
        statuss === 'Processing'
          ? 'text-yellow-400'
          : statuss === 'In Transit'
          ? 'text-violet-400'
          : statuss === 'Completed'
          ? 'text-green-400'
          : statuss === 'Cancelled'
          ? 'text-red-400'
          : '';
      return (
        <div className={`capitalize font-bold font-mainText3 ${statusClass} `}>{statusText}</div>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const statuss = row.getValue('status');
      if (statuss === 'Cancelled' || statuss === 'Completed') {
        return null;
      }
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {statuss === 'In Transit' && (
              <>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CompleteOrders orderId={row.getValue('idOrder')} />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CancelOrder orderId={row.getValue('idOrder')} />
                </DropdownMenuItem>
              </>
            )}

            {statuss === 'Processing' && (
              <>
                {' '}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ConfirmOrder orderId={row.getValue('idOrder')} />
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CancelOrder orderId={row.getValue('idOrder')} />
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    className: 'bg-green-500',
  },
];

export function DataTableOrder({ res }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data: res,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader className='rounded-md bg-textColer'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='  text-white'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
