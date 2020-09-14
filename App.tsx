/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './View/Login';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './View/Home';
import DetailScreen from './View/Detail';

export type RootStackParamList = {
  Home: undefined;
  Detail: {itemID: string};
};

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
// const HeartIcon = (
//   props?: Partial<ImageProps>,
// ): React.ReactElement<ImageProps> => <Icon {...props} name="heart" />;

const Stack = createStackNavigator<RootStackParamList>();

export default (): React.ReactFragment => {
  const [loginStatus, setLoginStatus] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const key = await AsyncStorage.getItem('@AssetTracer:key');
        if (key !== null) {
          setLoginStatus(1);
        } else {
          setLoginStatus(-1);
        }
      } catch (error) {
        console.error(error);
        setLoginStatus(-1);
      }
    })();
  }, []);

  const updateAuthStatus = (status: number) => {
    setLoginStatus(status);
  };

  const renderApp = () => {
    if (loginStatus === -1) {
      return <LoginScreen onSuccess={() => updateAuthStatus(1)} />;
    } else if (loginStatus === 1) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{header: () => null}}
            />
            <Stack.Screen
              name="Detail"
              component={DetailScreen}
              initialParams={{itemID: '0'}}
              options={() => ({
                headerTitle: 'Asset Detail',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        {renderApp()}
      </ApplicationProvider>
    </>
  );
};
