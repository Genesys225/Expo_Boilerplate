import React from 'react'
import Colors from '../config/colors'
import { StyleSheet, Text, View } from 'react-native'
import H1 from './common/H1'

interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
    return (
        <View style={styles.header}>
            <H1>{props.title}</H1>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
