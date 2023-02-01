import {View, Text, SafeAreaView} from 'react-native';
import globalStyles from '../../constants/globalStyles';
import IconicItemWithSwitch from '../../components/IconicItemWithSwitch';
import IconicItemWithText from '../../components/IconicItemWithText';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {globalStore} from '../../store/store';
import {languageItem, themeItem} from '../../store/settingSlice';

const SettingsScreen = ({navigation}: any) => {
  const {colors} = useTheme();
  const {themes, languages} = useSelector(
    (state: globalStore) => state.settings,
  );
  const {t} = useTranslation();
  const selectedTheme: themeItem = themes.find(item => item.selected === true)!;
  const selectedLanguage: languageItem = languages.find(
    item => item.selected === true,
  )!;
  return (
    <SafeAreaView>
      <View style={globalStyles.containerPadding16Style}>
        <View style={globalStyles.headerStyle}>
          <Icon name="settings" size={24} color={colors.text} />
          <Text style={{...globalStyles.headerTextStyle, color: colors.text}}>
            {t('settings')}
          </Text>
        </View>

        <IconicItemWithText
          backgroundColor={colors.card}
          textColor={colors.text}
          leftIconName="color-palette-outline"
          keyText={t('theme')}
          valueText={t([selectedTheme.code])}
          onPress={() => {
            navigation.navigate('Themes');
          }}
        />
        <IconicItemWithText
          backgroundColor={colors.card}
          textColor={colors.text}
          leftIconName="language-outline"
          keyText={t('language')}
          valueText={t([selectedLanguage.code])}
          onPress={() => {
            navigation.navigate('Languages');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
