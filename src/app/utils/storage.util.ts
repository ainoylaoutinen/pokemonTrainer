<<<<<<< HEAD
export class StorageUtil{

    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
            if (storedValue) {
                return JSON.parse(storedValue) as T;
            }
            return undefined;
        }
        catch (error) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
=======
export class StorageUtil {
    
  public static storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static storageRead<T>(key: string): T | null {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return null;
    } catch (error) {
      sessionStorage.removeItem(key);
      return null;
    }
  }
>>>>>>> 138e5b4a94313da0f17133dd97f1201871769772
}
