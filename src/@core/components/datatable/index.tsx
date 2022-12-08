// @ts-nocheck

import MUIDataTable from 'mui-datatables'

interface TableProps {
  title: string
  total: number
  columns: any
  data: any
  filter: any
  onChangeFilter: (action, value) => void
  onDelete: (rowsDeleted, newTableData) => Promise<boolean>
}

const Table = (props: TableProps) => {
  const { title, columns, data, total, filter, onChangeFilter, onDelete } = props
  const heightTable = window?.innerHeight - 355

  const options = {
    serverSide: true,

    search: true,
    download: true,                                                                                                         
    print: true,
    viewColumns: true,
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    tableBodyHeight: `${heightTable}px`,
    tableBodyMaxHeight: '100%',
    rowsPerPageOptions: [10, 25, 50, 100, { label: 'All', value: 999999 }],
    showFirstButton: true,
    showLastButton: true,
    page: filter.page - 1,
    count: total,
    rowsPerPage: filter.limit,
    stickyHeader: true,

    onTableChange: (action, state) => {
      onChangeFilter(action, state)
    },

    onRowsDelete: (rowsDeleted, newTableData) => {
      onDelete(rowsDeleted, newTableData)

      return false
    },

    textLabels: {
      body: {
        noMatch: 'Hiện thời không có dữ liệu',
        toolTip: 'Sắp xếp',
        columnHeaderTooltip: column => `Sắp xếp theo ${column.label}`
      },
      pagination: {
        next: 'Trang tiếp theo',
        previous: 'Trang trước',
        rowsPerPage: 'Hàng trên mỗi trang:',
        displayRows: 'trong'
      },
      toolbar: {
        search: 'Tìm kiếm',
        downloadCsv: 'Tải xuống CSV',
        print: 'In',
        viewColumns: 'Hiển thị các cột',
        filterTable: 'Bộ lọc'
      },
      filter: {
        all: 'Tất cả',
        title: 'Bộ lọc',
        reset: 'Đặt lại'
      },
      viewColumns: {
        title: 'Hiển thị các cột',
        titleAria: 'Hiện/Ẩn các cột'
      },
      selectedRows: {
        text: 'hàng đã chọn',
        delete: 'Xóa',
        deleteAria: 'Xóa những hàng đã chọn'
      }
    }
  }

  return (
    <MUIDataTable
      sx={{
        border: '4px solid rgba(0,0,0,0.2)',
        padding: 1,
        width: 400,
        height: 200,
        '&::-webkit-scrollbar': {
          width: 20
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'orange'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'red',
          borderRadius: 2
        },
        overflowX: 'hidden'
      }}
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default Table
