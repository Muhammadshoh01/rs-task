import React from 'react';

interface Props {
  allColumns: string[];
  selected: string[];
  onChange: (cols: string[]) => void;
  onClose: () => void;
}

export const ColumnSelectorModal: React.FC<Props> = ({
  allColumns,
  selected,
  onChange,
  onClose,
}) => {
  const toggle = (col: string) => {
    if (selected.includes(col)) {
      onChange(selected.filter((c) => c !== col));
    } else {
      onChange([...selected, col]);
    }
  };

  return (
    <div className="modal">
      <h3>Select extra columns</h3>
      <ul>
        {allColumns.map((col) => (
          <li key={col}>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(col)}
                onChange={() => toggle(col)}
              />
              {col}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
