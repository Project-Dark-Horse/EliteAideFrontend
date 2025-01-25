interface Searchable {
  title?: string;
  description?: string;
  [key: string]: any;
}

export const searchItems = <T extends Searchable>(
  items: T[],
  searchText: string,
  fields: (keyof T)[] = ['title', 'description']
): T[] => {
  if (!searchText.trim()) return items;

  const searchLower = searchText.toLowerCase();
  return items.filter(item =>
    fields.some(field => {
      const value = item[field];
      return value && 
        typeof value === 'string' && 
        value.toLowerCase().includes(searchLower);
    })
  );
}; 