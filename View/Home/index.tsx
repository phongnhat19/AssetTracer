import React, {useState} from 'react';
import {Layout, Button, Text} from '@ui-kitten/components';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [scanning, setScanning] = useState(false);
  const scanSuccessHandler = (e: Event) => {
    console.log(e.data);
    if (e.data.itemID) {
      navigation.navigate('Detail', {
        itemID: e.data.itemID,
      });
    }
  };

  const handleRedirectDetail = (itemID: string) => {
    navigation.navigate('Detail', {
      itemID,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {scanning ? (
        <QRCodeScanner
          onRead={scanSuccessHandler}
          topContent={
            <Text category="h2" style={styles.centerText}>
              Scan asset's QR code
            </Text>
          }
          bottomContent={
            <Button onPress={() => handleRedirectDetail('1')}>
              Simulate scanning result
            </Button>
          }
        />
      ) : (
        <Layout>
          <Button onPress={() => setScanning(true)}>Scan Asset QR code</Button>
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#000000',
  },
});
