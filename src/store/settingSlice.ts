import { createSlice } from '@reduxjs/toolkit';

export type themeItem = {
    id: number , name : string , code : string , selected : boolean
}
export type languageItem = {
    id: number , name : string , code : string , selected : boolean
}
export type SettingType = {
    themes : [themeItem],
    languages : [languageItem]
}

const initialState = {
    themes: [
        { id: 1, name: 'Light Mode', code: 'light', selected: true },
        { id: 2, name: 'Dark Mode', code: 'dark', selected: false }
    ],
    languages: [
        { id: 1, name: 'English', code: 'en', selected: true },
        { id: 2, name: 'VietNam', code: 'vn', selected: false }
    ]
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setTheme: (state, action) => {
            let payload = action.payload;
            if (!payload) {
                payload = 'light';
            }
            let themes = state.themes;
            themes.forEach((item) => {
                item.selected = item.code === payload;
            });
        },
        setLanguage: (state, action) => {
            let payload = action.payload;
            if (!payload) {
                payload = 'en';
            }
            let languages = state.languages;
            languages.forEach((item) => {
                item.selected = item.code === payload;
            });
        }
    }
}
);

export const { setTheme, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;