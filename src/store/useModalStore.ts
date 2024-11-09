import { create } from "zustand";

type Modals = {
   settings: boolean;
};

type UseModalStore = Modals & {
   setModal(key: keyof Modals, value: boolean): void;
};

const useModalStore = create<UseModalStore>((set) => ({
   settings: false,
   setModal(key, value) {
      return set((state) => {
         return {
            ...state,
            [key]: value,
         };
      });
   },
}));

export default useModalStore;
