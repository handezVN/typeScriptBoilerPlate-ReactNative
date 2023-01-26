import messaging from '@react-native-firebase/messaging';
import { getValueFromAsyncStorage, setValueInAsyncStorage } from './asyncStorage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
}

async function GetFCMToken(){
    let fcmToken:any = await getValueFromAsyncStorage('fcmToken');
        console.log('Old Token:', fcmToken);
        if (!fcmToken) {
            try {
               const fcmToken:any = await messaging().getToken();
               console.log(fcmToken);
               if (fcmToken) {
                    console.log('FcmToken:', fcmToken);
                    setValueInAsyncStorage('fcmToken', fcmToken);
               }
            } catch (error) {
                console.log('FcmToken:', error);
            }
            
        }
    
    
}

export const NotificationListener = () =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
      messaging().onMessage(async remoteMessage => console.log("Notification .... ", remoteMessage));
}