import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7D, logoUrl, onPress }) => {

    const priceChangeColor = priceChangePercentage7D > 0 ? '#34c759' : '#ff3b30'

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemWrapper}>
                <View style={styles.leftWrapper}>
                    <Image 
                        source={{ uri: logoUrl}}
                        style={styles.image}
                    />
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>{ name }</Text>
                        <Text style={styles.subtitle}>{ symbol.toUpperCase() }</Text>
                    </View>
                </View>
                <View style={styles.rightWrapper}>
                    <Text style={styles.title}>$ { currentPrice.toLocaleString('en-US', { currency: 'USD'}).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</Text>
                    <Text style={[styles.subtitle, {color: priceChangeColor}]}>{ priceChangePercentage7D.toFixed(2) } %</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemWrapper: {
        paddingHorizontal: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 48,
        width: 48
    },
    titlesWrapper: {
        marginLeft: 8
    },
    title: {
        fontSize: 18
    },
    subtitle: {
        fontSize: 14,
        color: '#a9abb1',
        marginTop: 4
    },
    rightWrapper: {
        alignItems: 'flex-end'
    },
})

export default ListItem
