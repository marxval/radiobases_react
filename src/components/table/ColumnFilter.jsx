export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
        <span>
            Search:{' '}
            <input value={filterValue || ''} style={{ maxWidth: '100px' }} onChange={e => setFilter(e.target.value)} />
        </span>
    )
}