import React, { useState } from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useFilters } from 'react-table'
import { FixedSizeList } from 'react-window'
import scrollbarWidth from './scrollbarWidth'
import { ColumnFilter } from './ColumnFilter.jsx'

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    text-align:center;

    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 1 px solid black;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      width: 150px;
      :last-child {
        border-right: 1px solid black;
      }
    },
  }
`

function Table({ columns, data }) {

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        totalColumnsWidth,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useFilters,
        useBlockLayout
    )


    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index]
            prepareRow(row)
            return (
                <div
                    {...row.getRowProps({
                        style,
                    })}
                    className="tr"
                >
                    {row.cells.map(cell => {
                        let color;
                        let { value } = cell;

                        if (isNaN(value)) {
                            color = ''
                            if (value === undefined)
                                color = '#EEECF1'
                        }
                        else if (value <= 15)
                            color = '#FF6962'
                        else if (value <= 40)
                            color = '#FD9945'
                        else if (value <= 90)
                            color = '#FFEB87'
                        else
                            color = '#93DCAF'

                        return (
                            <div {...cell.getCellProps()} className={`td`} style={{ backgroundColor: color }}>
                                {cell.render('Cell')}
                            </div>
                        )
                    })}
                </div>
            )
        },
        [prepareRow, rows]
    )

    // Render the UI for your table

    return (
        <div {...getTableProps()} className="table">
            <div>
                {headerGroups.map(headerGroup => (
                    <div {...headerGroup.getHeaderGroupProps()} className="tr">
                        {headerGroup.headers.map(column => {
                            return (
                                <>
                                    <div {...column.getHeaderProps()} className="th">
                                        {column.render('Header')}
                                        <div>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    </div>

                                </>
                            )
                        }
                        )}
                    </div>
                ))}
            </div>

            <div {...getTableBodyProps()}>
                <FixedSizeList
                    height={600}
                    itemCount={rows.length}
                    itemSize={35}
                    width={rows.length < 18 ? totalColumnsWidth : totalColumnsWidth + scrollBarSize}
                >
                    {RenderRow}
                </FixedSizeList>
            </div>
        </div>
    )
}


function App({ tableData }) {
    const { dates, bases } = tableData;


    const columns = React.useMemo(
        () => {
            let dateColumns = dates.map(key => {
                return {
                    Header: key,
                    disableFilters: true,
                    accessor: key,
                }
            })
            dateColumns.unshift({
                Header: 'ID',
                accessor: 'id',
                Filter: ColumnFilter
            })
            return ([
                {
                    Header: 'Traffic by date',
                    columns: dateColumns
                },
            ])
        }, [dates]
    )


    return (
        <Styles>
            <Table columns={columns} data={bases} style={{ overflow: 'scroll' }} />
        </Styles>
    )
}

export default App
