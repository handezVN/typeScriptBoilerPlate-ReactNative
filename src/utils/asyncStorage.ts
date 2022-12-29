import AsyncStorage from '@react-native-async-storage/async-storage';

export const setValueInAsyncStorage = async (key:string, value:any) => {
    try {
        if (key && value) {
            let valueToStore = value;
            if (typeof value === 'object') {
                valueToStore = JSON.stringify(value);
            }
            await AsyncStorage.setItem(key, valueToStore);
        }
    } catch (error) {
        console.log('error in asyncStorage -> storeData: ', error);
    }
};

export const getValueFromAsyncStorage = async (key:string) => {
    try {
        if (key) {
            const value:any = await AsyncStorage.getItem(key);
            if (typeof value === 'object') {
                return JSON.parse(value);
            } else {
                return value;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log('error in asyncStorage -> getStoredValue: ', error);
        return null;
    }
};