import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

// Функція для завантаження контактів з LocalStorage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("contacts");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return undefined;
  }
}

// Функція для збереження контактів у LocalStorage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("contacts", serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
}

// Ініціалізація стору зі станом, завантаженим з LocalStorage
const preloadedState = {
  contacts: loadFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
  preloadedState,
});

// Підписуємося на оновлення стору, щоб зберегти зміни у LocalStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState().contacts);
});
