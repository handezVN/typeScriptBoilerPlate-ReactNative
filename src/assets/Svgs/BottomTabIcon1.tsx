import React, {PureComponent} from 'react';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';

class App extends PureComponent {
  constructor(props: any) {
    super(props);
  }

  render() {
    let image = (
      <View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            opacity="0.4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2853 2H19.5519C20.9035 2 21.9998 3.1059 21.9998 4.47018V7.7641C21.9998 9.12735 20.9035 10.2343 19.5519 10.2343H16.2853C14.9328 10.2343 13.8364 9.12735 13.8364 7.7641V4.47018C13.8364 3.1059 14.9328 2 16.2853 2Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.44892 2H7.71449C9.06703 2 10.1634 3.1059 10.1634 4.47018V7.7641C10.1634 9.12735 9.06703 10.2343 7.71449 10.2343H4.44892C3.09638 10.2343 2 9.12735 2 7.7641V4.47018C2 3.1059 3.09638 2 4.44892 2Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.44892 13.7656H7.71449C9.06703 13.7656 10.1634 14.8715 10.1634 16.2368V19.5297C10.1634 20.894 9.06703 21.9999 7.71449 21.9999H4.44892C3.09638 21.9999 2 20.894 2 19.5297V16.2368C2 14.8715 3.09638 13.7656 4.44892 13.7656Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2853 13.7656H19.5519C20.9035 13.7656 21.9998 14.8715 21.9998 16.2368V19.5297C21.9998 20.894 20.9035 21.9999 19.5519 21.9999H16.2853C14.9328 21.9999 13.8364 20.894 13.8364 19.5297V16.2368C13.8364 14.8715 14.9328 13.7656 16.2853 13.7656Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    );
    return <>{image}</>;
  }
}
export default App;
