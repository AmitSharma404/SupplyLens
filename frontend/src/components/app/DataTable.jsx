import { motion } from 'framer-motion';

const DataTable = ({ columns, data, onRowClick, renderActions }) => {
  return (
    <div className="overflow-x-auto rounded-[12px]" style={{ border: '1px solid var(--app-border)' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left py-3 px-4"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  color: 'var(--app-text-muted)',
                  background: 'var(--app-surface)',
                }}
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th
                className="text-right py-3 px-4"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  color: 'var(--app-text-muted)',
                  background: 'var(--app-surface)',
                }}
              />
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <motion.tr
              key={row.id || i}
              className="group cursor-pointer transition-colors duration-150"
              style={{ borderBottom: '1px solid var(--app-border)' }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: 'easeOut' }}
              onClick={() => onRowClick?.(row)}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--app-overlay)';
                e.currentTarget.style.borderLeft = '2px solid var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderLeft = '2px solid transparent';
              }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="py-3 px-4"
                  style={{
                    fontSize: '14px',
                    color: 'var(--app-text)',
                    fontFamily: col.mono ? 'var(--font-mono)' : 'inherit',
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {renderActions && (
                <td className="py-3 px-4 text-right">
                  {renderActions(row)}
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
