import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {}
  }

  async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {}
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (e) {}
  }
}

export const localStorage = new LocalStorage();
