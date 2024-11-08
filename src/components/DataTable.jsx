import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsUpDownIcon,
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline'
import { Dropdown, Search } from './componentes'
import { useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank })
  return itemRank.passed
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DataTable = ({ data, columns }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])

  const tabla = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
  })

  const getStateTable = () => {
    const totalRows = tabla.getFilteredRowModel().rows.length;
    const pageSize = tabla.getState().pagination.pageSize;
    const pageIndex = tabla.getState().pagination.pageIndex;
    const rowsPerPage = tabla.getRowModel().rows.length;

    const firstIndex = (pageIndex * pageSize) + 1;
    const lastIndex = (pageIndex * pageSize) + rowsPerPage;

    return {
      pageIndex,
      totalRows,
      firstIndex,
      lastIndex
    }
  }

  const initialOptions = [
    { id: 1, name: '10', },
    { id: 2, name: '20', },
    { id: 3, name: '30', },
    { id: 4, name: '40', },
    { id: 5, name: '50', },
  ]

  const onSearch = (value) => setGlobalFilter(String(value))
  const onSetRows = (value) => tabla.setPageSize(Number(value.name))

  return (
    <>
      <div className='my-4 mx-8 text-left'>
        <Search id='search' name='search' type="text" placeholder='Buscar...' value={globalFilter ?? ''} onType={onSearch} />
      </div>
      <div className='relative overflow-x-auto border-b-2 border-bull-shot-500 sm:rounded-lg mx-8'>
        <table className='table-auto w-full'>
          <thead>
            {tabla.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className=' bg-minsk-500 text-mirage-50'>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='px-4 py-2 text-left uppercase'>
                    {header.isPlaceholder ? null :
                      <div className={
                        classNames(
                          header.column.getCanSort() ? 'cursor-pointer select-none flex justify-between' : 'text-mirage-50',
                          'flex items-center space-x-1'
                        )
                      }
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <BarsArrowUpIcon className="h-4 w-4" aria-hidden="true" />,
                          desc: <BarsArrowDownIcon className="h-4 w-4" aria-hidden="true" />
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? <ArrowsUpDownIcon className="h-4 w-4" aria-hidden="true" /> : null)}
                      </div>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {tabla.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-b-2 border-mirage-200 text-minsk-900 bg-mirage-50 hover:bg-mirage-100'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='px-4 py-2 text-left'>
                    {flexRender(cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='my-4 mx-8 md:flex items-center justify-between space-y-2'>
        <div className='flex items-center justify-center gap-2'>
          <button className='text-mirage-50 bg-minsk-500 hover:bg-minsk-600 px-1 py-1 rounded-full disabled:bg-minsk-100 disabled:text-minsk-400 disabled:hover:bg-minsk-200 disabled:hover:text-minsk-500'
            onClick={() => tabla.setPageIndex(0)}
            disabled={!tabla.getCanPreviousPage()} >
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className='text-mirage-50 bg-minsk-500 hover:bg-minsk-600 px-1 py-1 rounded-full disabled:bg-minsk-100 disabled:text-minsk-400 disabled:hover:bg-minsk-200 disabled:hover:text-minsk-500'
            onClick={() => tabla.previousPage()}
            disabled={!tabla.getCanPreviousPage()} >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className='text-minsk-900 font-semibold px-1'>
            Pág. {tabla.getState().pagination.pageIndex + 1} de {tabla.getPageCount() == 0 ? 1 : tabla.getPageCount()}
          </div>
          <button className='text-mirage-50 bg-minsk-500 hover:bg-minsk-600 px-1 py-1 rounded-full disabled:bg-minsk-100 disabled:text-minsk-400 disabled:hover:bg-minsk-200 disabled:hover:text-minsk-500'
            onClick={() => tabla.nextPage()}
            disabled={!tabla.getCanNextPage()} >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button className='text-mirage-50 bg-minsk-500 hover:bg-minsk-600 px-1 py-1 rounded-full disabled:bg-minsk-100 disabled:text-minsk-400 disabled:hover:bg-minsk-200 disabled:hover:text-minsk-500'
            onClick={() => tabla.setPageIndex(tabla.getPageCount() - 1)}
            disabled={!tabla.getCanNextPage()} >
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className='text-minsk-900 font-semibold px-1 flex items-center justify-center gap-x-2'>
          Filas por Pág.
          <Dropdown listOptions={initialOptions} onView={onSetRows} />
        </div>
        <div className='text-minsk-900 font-semibold px-1 justify-center flex'>
          {getStateTable().totalRows == 0 ? 0 : getStateTable().firstIndex}-{getStateTable().lastIndex} de {getStateTable().totalRows}
        </div>
      </div>
    </>
  )
}
