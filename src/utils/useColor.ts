import { useTheme } from "@react-navigation/native";
import { DarkMode, LightMode } from "constants/colors";

const {dark} = useTheme();

export const Colors = dark ? DarkMode.colors : LightMode.colors;