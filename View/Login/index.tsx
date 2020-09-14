import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button, Layout, Spinner} from '@ui-kitten/components';
import {Icon, Input} from '@ui-kitten/components';
import {login} from '../../services/kintone/auth';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingIndicator = (props: any) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status="control" size="small" />
  </View>
);

export const LoginScreen = ({onSuccess}: {onSuccess: () => void}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [logginIn, setLoggingIn] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      const result = await login(username, password);
      await AsyncStorage.setItem('@AssetTracer:key', result.key);
      onSuccess();
    } catch (error) {
      console.log(error);
      setLoggingIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Layout style={styles.view}>
        <Layout style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={username}
            label="Username"
            placeholder="Username"
            onChangeText={(nextValue) => setUsername(nextValue)}
          />
        </Layout>
        <Layout style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={password}
            label="Password"
            placeholder="Password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </Layout>
        <Button
          onPress={handleLogin}
          disabled={logginIn}
          accessoryLeft={logginIn ? LoadingIndicator : undefined}>
          {logginIn ? 'Logging In' : 'Login'}
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    flexDirection: 'row',
  },
  input: {
    paddingHorizontal: 45,
    flex: 1,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
