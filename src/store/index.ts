import {create} from 'zustand';
import {defaultLanguage} from '../config';
import {AppState} from './types';

const useAppStore = create<AppState>(set => ({
  language: defaultLanguage,
  setLanguage: language => set({language}),
}));

export default useAppStore;
