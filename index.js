/**
 * @format
 */

import {AppRegistry, NativeModules} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  const { UIManager } = NativeModules;
  if (UIManager) {
    // Add gesture specific events to genericDirectEventTypes object exported from UIManager native module.
    // Once new event types are registered with react it is possible to dispatch these events to all kind of native views.
    UIManager.genericDirectEventTypes = {
      ...UIManager.genericDirectEventTypes,
      onGestureHandlerEvent: { registrationName: 'onGestureHandlerEvent' },
      onGestureHandlerStateChange: {
        registrationName: 'onGestureHandlerStateChange',
      },
    };
  }
}


AppRegistry.registerComponent(appName, () => App);
