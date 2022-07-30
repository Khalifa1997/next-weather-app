import create from "zustand";

interface CityState {
  city: string;
  setCity: Function;
}

const useStore = create<CityState>()((set) => ({
  city: "",
  setCity: (city: string) => set(() => ({ city: city })),
}));

export default useStore;
