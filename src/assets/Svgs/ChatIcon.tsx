import React, {PureComponent} from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
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
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0568 2.00017C8.54687 1.98599 5.28557 3.80713 3.4605 6.80044C1.63543 9.79375 1.51292 13.5224 3.13757 16.6287L3.33789 17.0192C3.50209 17.3265 3.53644 17.6865 3.43329 18.0192C3.14742 18.7785 2.90849 19.5545 2.71784 20.343C2.71784 20.743 2.83231 20.9716 3.26158 20.962C4.0219 20.7941 4.77068 20.5778 5.50332 20.3144C5.81886 20.2275 6.15437 20.2476 6.45725 20.3716C6.73389 20.5049 7.2967 20.8478 7.31578 20.8478C10.9915 22.7805 15.4808 22.2473 18.5998 19.5075C21.7187 16.7677 22.8199 12.3901 21.3676 8.50413C19.9153 4.61818 16.2111 2.03062 12.0568 2.00017V2.00017Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Ellipse
            opacity="0.4"
            cx="7.28702"
            cy="12.0001"
            rx="0.476965"
            ry="0.47619"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Ellipse
            opacity="0.4"
            cx="12.057"
            cy="12.0001"
            rx="0.476965"
            ry="0.47619"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Ellipse
            opacity="0.4"
            cx="16.8266"
            cy="12.0001"
            rx="0.476965"
            ry="0.47619"
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
