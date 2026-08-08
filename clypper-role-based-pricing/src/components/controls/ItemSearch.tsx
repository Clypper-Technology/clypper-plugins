import { Button, ComboboxControl } from "@wordpress/components"
import { useState } from "react"

export interface SearchItem {
  id: number,
  image_url?: string,
}

export interface ItemSearchProps<T extends SearchItem> {
  searchItems: (search: string) => Promise<T[]>,
  displayItem: (item: T) => DisplayItem,
  onItemAdded: (item: T) => void,
  addedItems?: Array<T>,
}

export interface DisplayItem {
  value: string,
  label: string
}

export const ItemSearch = <T extends SearchItem>({
  searchItems,
  displayItem,
  onItemAdded,
  addedItems = [],
}: ItemSearchProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [options, setOptions] = useState<DisplayItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFilterValueChange = async (inputValue: string) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }
    setLoading(true);
    const results = await searchItems(inputValue);
    setItems(results);
    setOptions(results.map(displayItem));
    setLoading(false);
  };

  return (
    <ComboboxControl
      label="Search for product"
      options={options}
      onFilterValueChange={onFilterValueChange}
      isLoading={loading}
      __experimentalRenderItem={({ item: option }) => {
        const item = items.find(p => String(p.id) === option.value);
        if (!item) return null;

        const isAdded = addedItems.some(element => item.id == element.id);

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {item.image_url && (
              <img
                src={item.image_url}
                alt=""
                style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: 2 }}
              />
            )}
            <span style={{ flex: 1 }}>{option.label}</span>
            <Button
              variant={isAdded ? "secondary" : "primary"}
              disabled={isAdded}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onItemAdded(item);
              }}
            >
              {isAdded ? "Added" : "Add"}
            </Button>
          </div>
        );
      }}
    />
  )
}
