import { useEffect, useState } from "react";

const isLocalStorageAvailable = () => {
 try {
 const testKey = "__local_storage_test__";
 window.localStorage.setItem(testKey, testKey);
 window.localStorage.removeItem(testKey);
 return true;
 } catch (error) {
 console.warn("localStorage no está disponible:", error);
 return false;
 }
};

const readStorageValue = (key, initialValue) => {
 if (!isLocalStorageAvailable()) {
 return initialValue;
 }

 try {
 const storedValue = window.localStorage.getItem(key);
 return storedValue !== null ? JSON.parse(storedValue) : initialValue;
 } catch (error) {
 console.error(`useLocalStorage: no se pudo leer ${key} de localStorage`, error);
 return initialValue;
 }
};

export const useLocalStorage = (key, initialValue) => {
 const [storedValue, setStoredValue] = useState(() => readStorageValue(key, initialValue));

 useEffect(() => {
 if (!isLocalStorageAvailable()) {
 return;
 }

 try {
 window.localStorage.setItem(key, JSON.stringify(storedValue));
 } catch (error) {
 console.error(`useLocalStorage: no se pudo guardar ${key} en localStorage`, error);
 }
 }, [key, storedValue]);

 const setValue = (value) => {
 setStoredValue((prevValue) =>
 typeof value === "function" ? value(prevValue) : value
 );
 };

 return [storedValue, setValue];
};