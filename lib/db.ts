
/**
 * Mock Database Service
 * Provides a simple interface for CRUD operations using browser's localStorage.
 * This can be easily replaced with an actual API client in the future.
 */
export const db = {
  /**
   * Retrieves all records from a specific table (key in localStorage).
   */
  get: (table: string): any[] => {
    try {
      const data = localStorage.getItem(`db_${table}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading from table ${table}:`, error);
      return [];
    }
  },
  
  /**
   * Inserts a new record into the specified table.
   * Generates a unique ID and timestamp for the new record.
   */
  insert: (table: string, record: any): any => {
    const data = db.get(table);
    const newRecord = { 
      ...record, 
      id: Math.random().toString(36).substr(2, 9), // Simple unique ID generation
      createdAt: new Date().toISOString() 
    };
    data.push(newRecord);
    localStorage.setItem(`db_${table}`, JSON.stringify(data));
    return newRecord;
  },

  /**
   * Updates an existing record by ID.
   */
  update: (table: string, id: string, updates: any): void => {
    const data = db.get(table);
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      localStorage.setItem(`db_${table}`, JSON.stringify(data));
    }
  },

  /**
   * Removes a record from the table by ID.
   */
  delete: (table: string, id: string): void => {
    const data = db.get(table);
    const filtered = data.filter((item: any) => item.id !== id);
    localStorage.setItem(`db_${table}`, JSON.stringify(filtered));
  }
};
