import { Dimensions } from "react-native";


export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;


export const dimen_x = (value:number) =>  SCREEN_WIDTH * value;
export const dimen_y = (value:number) =>  SCREEN_HEIGHT * value;
