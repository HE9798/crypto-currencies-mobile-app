import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { SAMPLE_DATA } from './assets/data/SampleData'
import { getMarketData } from './services/CryptoService'

import ListItem from './components/ListItem'
import Chart from './components/Chart'

export default function App() {

  const [data, setData] = useState([])
  const [selectedCoinData, setSelectedCoinData] = useState(null)

  useEffect(() => {
    const fetchMarketData = async() => {
      const marketData = await getMarketData()
      setData(marketData)
    }
      
    fetchMarketData()
  },[])

  const bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['45%'], [])

  const openModal = (item) => {
    setSelectedCoinData(item)
    bottomSheetModalRef.current.present()
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.textLarge}>Markets</Text>
        </View>
        <View style={styles.divider} />

        <FlatList 
          style={{ marginBottom: 30 }}
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({item}) => (
            <ListItem 
              name={ item.name } 
              symbol={ item.symbol } 
              currentPrice={ item.current_price }
              priceChangePercentage7D={ item.price_change_percentage_7d_in_currency }
              logoUrl={ item.image }
              onPress={() => openModal(item)}
            />
          )}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        { selectedCoinData ? (
          <Chart
          currentPrice={selectedCoinData.current_price}
          logoUrl={selectedCoinData.image}
          name={selectedCoinData.name}
          symbol={selectedCoinData.symbol}
          priceChangePercentage7D={selectedCoinData.price_change_percentage_7d_in_currency}
          sparkline={selectedCoinData.sparkline_in_7d.price}
        />) : null 
        }
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 60,
    paddingHorizontal: 16
  },
  textLarge: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#a9abb1',
    marginHorizontal: 16,
    marginTop: 16
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }
});
