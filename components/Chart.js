import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts'
import { useSharedValue } from 'react-native-reanimated'

export const {width: SIZE} = Dimensions.get('window')

const Chart = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7D, sparkline }) => {

    const latestCurrentPrice = useSharedValue(currentPrice)

    const [chartReady, setChartReady] = useState(false)

    const priceChangeColor = priceChangePercentage7D > 0 ? '#34c759' : '#ff3b30'

    useEffect(() => {
        latestCurrentPrice.value = currentPrice

        setTimeout(() => {
            setChartReady(true)
        }, 0)
    }, [currentPrice])

    const formatUSD = value => {
        'worklet';
        if (value === '') {
            return `$ ${latestCurrentPrice.value.toLocaleString('en-US', {currency: 'USD'})}`
        }

        const formattedValue = `$ ${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`

        return formattedValue
    }

    return (
        <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
            <View style={styles.chartWrapper}>
                <View style={styles.titlesWrapper}>
                    <View style={styles.upperTitles}>
                        <View style={styles.upperLeftTitle}>
                            <Image 
                                source={{ uri: logoUrl}}
                                style={styles.image}
                            />
                            <Text style={styles.subtitle}>{ name } ({ symbol.toUpperCase() })</Text>
                        </View>

                        <Text style={styles.subtitle}>7D</Text>
                    </View>

                    <View style={styles.lowerTitles}>
                        <ChartYLabel 
                            format={formatUSD}
                            style={styles.boldTitle}
                        />
                        <Text style={[styles.title, {color: priceChangeColor}]}>{ priceChangePercentage7D.toFixed(2) }%</Text>
                    </View>
                </View>
                { chartReady ? (
                <View style={styles.chartLineWrapper}>
                    <ChartPath height={SIZE / 2} stroke="blue" width={SIZE} />
                    <ChartDot style={{ backgroundColor: 'blue' }} />
                </View>) : null
                }              
            </View>
        </ChartPathProvider>
    )
}

const styles = StyleSheet.create({
    chartWrapper: {
        marginVertical: 16
    },
    titlesWrapper: {
        marginHorizontal: 16
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upperLeftTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 4
    },
    subtitle: {
        fontSize: 14,
        color: '#a9abb1'
    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boldTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    title: {
        fontSize: 18,
    },
    chartLineWrapper: {
        marginTop: 40
    }
})

export default Chart
