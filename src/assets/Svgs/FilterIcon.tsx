import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

const FilterIcon = () => {
  return (
    <View>
      <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <Path
          opacity="0.4"
          d="M10.539 17.9866H3.00342"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.998 17.9866C21.998 19.5772 20.6549 20.8666 18.998 20.8666C17.3412 20.8666 15.998 19.5772 15.998 17.9866C15.998 16.3948 17.3412 15.1066 18.998 15.1066C20.6549 15.1066 21.998 16.3948 21.998 17.9866Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          opacity="0.4"
          d="M14.4614 6.26212H21.9982"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.00293 6.26211C3.00293 7.85388 4.34607 9.14211 6.00293 9.14211C7.65979 9.14211 9.00293 7.85388 9.00293 6.26211C9.00293 4.67152 7.65979 3.38211 6.00293 3.38211C4.34607 3.38211 3.00293 4.67152 3.00293 6.26211Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default FilterIcon;
