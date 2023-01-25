import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RobotoText} from 'components/TextStyle/RobotoText';
import {dimen_y} from 'utils/dimes';
import {Colors} from 'constants/colors';
import Icon from 'react-native-vector-icons/Feather';
const InputComponent = ({
  title,
  placeholder,
  onChange,
  isPassword = false,
}: {
  title: string;
  placeholder: string;
  onChange?: any;
  isPassword?: boolean;
}) => {
  const [eye, setEye] = useState<boolean>(isPassword);
  return (
    <View style={{marginBottom: dimen_y(24 / 812)}}>
      <RobotoText style={{fontWeight: '400', fontSize: 14}}>{title}</RobotoText>
      <View style={{position: 'relative'}}>
        <TextInput
          style={{
            height: dimen_y(48 / 812),
            width: '100%',
            backgroundColor: Colors.grey,
            marginTop: 8,
            borderRadius: 8,
            paddingHorizontal: 16,
          }}
          placeholder={placeholder}
          onChange={onChange}
          secureTextEntry={eye}
        />
        {isPassword && (
          <TouchableOpacity
            style={{position: 'absolute', top: 22.5, right: 10}}
            onPress={() => setEye(!eye)}>
            {eye ? (
              <Icon name={'eye'} size={20} color="#9D9D9D" />
            ) : (
              <Icon name={'eye-off'} size={20} color="#9D9D9D" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({});
