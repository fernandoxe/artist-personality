export interface ChipListProps {
  items: string[];
  disabled?: boolean;
  onDelete: (item: string) => void;
};

export const ChipList = ({ items, disabled, onDelete }: ChipListProps) => {
  const handleDelete = (item: string) => {
    onDelete(item);
  };

  return (
    <div className="flex gap-2 flex-wrap text-sm">
      {items.map((item) => (
        <div key={item} className="flex gap-2 items-center justify-between px-2 py-1 bg-purple-300 rounded-md">
          <span>{item}</span>
          {!disabled &&
            <button onClick={() => handleDelete(item)}>
              <span role="img" aria-label="delete">❌</span>
            </button>
          }
        </div>
      ))}
    </div>
  );
};
