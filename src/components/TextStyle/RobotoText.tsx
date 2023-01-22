import * as React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

/* ở font open sans chỉ có 5 styles, còn mặc định của react-native có 9 styles 
và kèm 2 styles mặc định ở đây chúng ta custom lại sao cho khớp với react-native */
const RobotoFont: any = {
  normal: 'normal',
  bold: 'bold',
  '100': 'light',
  '200': 'light',
  '300': 'light',
  '400': 'normal',
  '500': 'normal',
  '600': 'semi-bold',
  '700': 'bold',
  '800': 'extra-bold',
  '900': 'extra-bold',
};

/* chuyển fontWeight và fontStyle lại ban đầu
bởi vì chúng ta sử dụng fontFamily có kèm 2 thằng này rồi */
const disableStyles: any = {
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export function RobotoText(props: TextProps) {
  /* ở đây mình lấy giá trị fontWeight với fontStyle ra */
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(props.style || {});

  /* bây giờ mình thêm fontFamily vào với cú pháp font mình đã định trước 
  cú pháp: tên font _ độ đậm _ italic (nếu có) */
  const fontFamily = `roboto-${RobotoFont[fontWeight]}${
    fontStyle === 'italic' ? '_italic' : ''
  }`;

  return <Text {...props} style={[props.style, {fontFamily}, disableStyles]} />;
}
