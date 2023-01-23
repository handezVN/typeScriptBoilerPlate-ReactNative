import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-safearea-height";

export const SCREEN_WIDTH : number = Dimensions.get('screen').width;
export const SCREEN_HEIGHT :number= Dimensions.get('screen').height ;


export const dimen_x = (value:number) =>  SCREEN_WIDTH * value;
export const dimen_y = (value:number) =>  SCREEN_HEIGHT * value;
