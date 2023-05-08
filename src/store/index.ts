import { create, StateCreator } from 'zustand'

interface BearSlice {
  bears: number
  addBear: () => void
  eatFish: () => void
}
const createBearSlice: StateCreator<any> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
  setAuth: (state, action: PayloadAction<string>) => {
    const token = action.payload;
    const { role = null } = token ? jwt_decode<DecodedToken>(token) : {};
    state.role = role;
    state.token = token;
    state.isLogin = true;
  },
  resetAuth: () => initialState,


})

interface FishSlice {
  fishes: number
  addFish: () => void
}
const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

const useBoundStore = create<BearSlice & FishSlice>()((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))


