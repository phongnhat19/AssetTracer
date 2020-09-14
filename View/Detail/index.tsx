import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {Layout, Text, Card} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {RootStackParamList} from '../../App';
import {getAssetDetail} from '../../services/kintone/record';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const {params} = useRoute<DetailScreenRouteProp>();
  const [assetData, setAssetData] = useState<Record<string, any>>();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@AssetTracer:key');
      if (!token) {
        return;
      }
      try {
        const data = await getAssetDetail(params.itemID, token);
        setAssetData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [params.itemID]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Layout>
        <Card>
          <Text>
            Name: {assetData && assetData.name && assetData.name.value}
          </Text>
          <Text>
            Description:{' '}
            {assetData && assetData.description && assetData.description.value}
          </Text>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
