import React, {PureComponent} from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {View} from 'react-native';

class App extends PureComponent {
  constructor(props: any) {
    super(props);
  }

  render() {
    let image = (
      <View>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <G clip-path="url(#clip0_242_9159)">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.50083 13.7871V13.5681C3.53295 12.9202 3.7406 12.2925 4.10236 11.7496C4.7045 11.0975 5.1167 10.2983 5.29571 9.43598C5.29571 8.7695 5.29571 8.0935 5.35393 7.42703C5.65469 4.21842 8.82728 2 11.9611 2H12.0387C15.1725 2 18.345 4.21842 18.6555 7.42703C18.7137 8.0935 18.6555 8.7695 18.704 9.43598C18.8854 10.3003 19.2972 11.1019 19.8974 11.7591C20.2618 12.2972 20.4698 12.9227 20.4989 13.5681V13.7776C20.5206 14.648 20.2208 15.4968 19.6548 16.1674C18.907 16.9515 17.8921 17.4393 16.8024 17.5384C13.607 17.8812 10.383 17.8812 7.18762 17.5384C6.09914 17.435 5.08576 16.9479 4.33521 16.1674C3.778 15.4963 3.48224 14.6526 3.50083 13.7871Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              opacity="0.4"
              d="M9.55518 20.8516C10.0545 21.4782 10.7876 21.8838 11.5925 21.9785C12.3973 22.0732 13.2074 21.8493 13.8435 21.3562C14.0391 21.2103 14.2152 21.0408 14.3674 20.8516"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_242_9159">
              <Rect width="24" height="24" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      </View>
    );
    return <>{image}</>;
  }
}
export default App;