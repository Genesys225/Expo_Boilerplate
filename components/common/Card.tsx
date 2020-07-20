import React, { ReactNode } from 'react'
import { StyleSheet, View, ViewStyle, ViewProps } from 'react-native'

interface CardProps extends ViewProps {
  children: ReactNode,
  style?: ViewStyle | {}
}

const Card = ({children, style = {}}: CardProps) => {
  return (
    <View style={{...styles.card, ...style}}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
})
