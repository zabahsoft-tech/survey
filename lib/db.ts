
/**
 * Mock Database Service
 * Provides a simple interface for CRUD operations using browser's localStorage.
 */
export const db = {
  get: (table: string): any[] => {
    try {
      const data = localStorage.getItem(`db_${table}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from table ${table}:`, error);
      return [];
    }
  },

  getSingle: (table: string): any => {
    const data = db.get(table);
    return data.length > 0 ? data[0] : null;
  },
  
  insert: (table: string, record: any): any => {
    const data = db.get(table);
    const newRecord = { 
      ...record, 
      id: record.id || Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString() 
    };
    data.push(newRecord);
    localStorage.setItem(`db_${table}`, JSON.stringify(data));
    return newRecord;
  },

  update: (table: string, id: string, updates: any): void => {
    const data = db.get(table);
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      localStorage.setItem(`db_${table}`, JSON.stringify(data));
    }
  },

  updateSingle: (table: string, updates: any): void => {
    const data = db.get(table);
    if (data.length > 0) {
      data[0] = { ...data[0], ...updates };
    } else {
      data.push({ ...updates, id: 'singleton' });
    }
    localStorage.setItem(`db_${table}`, JSON.stringify(data));
  },

  delete: (table: string, id: string): void => {
    const data = db.get(table);
    const filtered = data.filter((item: any) => item.id !== id);
    localStorage.setItem(`db_${table}`, JSON.stringify(filtered));
  },

  seed: (table: string, initialData: any[]) => {
    if (db.get(table).length === 0) {
      localStorage.setItem(`db_${table}`, JSON.stringify(initialData));
    }
  },

  seedSingle: (table: string, initialData: any) => {
    if (db.get(table).length === 0) {
      localStorage.setItem(`db_${table}`, JSON.stringify([{ ...initialData, id: 'singleton' }]));
    }
  }
};
