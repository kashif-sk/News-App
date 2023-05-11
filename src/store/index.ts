import {create} from 'zustand';
import {AppState} from './types';

const useAppStore = create<AppState>(set => ({
  language: null,
  setLanguage: language => set({language}),
}));

export default useAppStore;
