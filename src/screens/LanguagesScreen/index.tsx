import {SafeAreaView, View, FlatList} from 'react-native';
import globalStyles from '../../constants/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../SettingsScreen/slice';
import ItemWithIcon from '../../components/ItemWithIcon';
import {useTranslation} from 'react-i18next';
import {setValueInAsyncStorage} from '../../utils/asyncStorage';
import {useTheme} from '@react-navigation/native';
import {globalStore} from '../../store/store';
import {languageItem} from '../../store/settingSlice';

const LanguagesScreen = ({navigation}: any) => {
  const {colors} = useTheme();

  const dispatch = useDispatch();
  const {languages} = useSelector((state: globalStore) => state.settings);

  const {i18n} = useTranslation();
  type renderItemProps = {
    item: languageItem;
    index: number;
  };
  const ChangeLangue = async (value: string) => {
    i18n.changeLanguage(value);
    // change language in store
    dispatch(setLanguage(value));
    // save selected language in AsyncStorage
    setValueInAsyncStorage('selected_language', value);
  };
  const renderItem = ({item, index}: renderItemProps) => {
    return (
      <ItemWithIcon
        backgroundColor={colors.card}
        textColor={colors.text}
        text={item.name}
        iconName={
          item.selected ? 'checkmark-circle' : 'checkmark-circle-outline'
        }
        onPress={() => {
          ChangeLangue(item.code);
        }}
      />
    );
  };
  return (
    <SafeAreaView>
      <View style={globalStyles.containerPadding16Style}>
        <FlatList
          data={languages}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default LanguagesScreen;
