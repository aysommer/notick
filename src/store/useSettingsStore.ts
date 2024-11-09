import { create } from "zustand";

type Settings = {
   fontSize: number;
   fontColor: string;
};

type UseSettingsStore = Settings & {
   setSettings(value: Partial<Settings>): void;
   resetSettings(): void;
};

const LOCAL_STORAGE_KEY = "settings";

const DEFAULT_SETTINGS: Settings = {
   fontSize: 14,
   fontColor: "#000000",
};

// FIXME: Need unify:
// - useNotesStore,
// - useSettingsStore
function getSettingsFromCache(): Settings {
   const value = localStorage.getItem(LOCAL_STORAGE_KEY);
   if (value) {
      return JSON.parse(value) as Settings;
   }
   return DEFAULT_SETTINGS;
}

function setSettingsToCache(value: Settings): void {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

const useSettingsStore = create<UseSettingsStore>((set) => ({
   ...getSettingsFromCache(),
   setSettings(value) {
      return set((state) => {
         const settings = { ...state, ...value };
         setSettingsToCache(settings);
         return settings;
      });
   },
   resetSettings() {
      return set((state) => {
         const settings = { ...state, ...DEFAULT_SETTINGS };
         setSettingsToCache(settings);
         return settings;
      });
   },
}));

export default useSettingsStore;
