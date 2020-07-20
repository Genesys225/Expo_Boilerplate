import React from 'react'
import { StyleSheet, View, Button, ButtonProps, ViewStyle } from 'react-native'
import Colors from '../../config/colors'

interface BeButtonProps extends ButtonProps {
  style?: ViewStyle,
}

const BeButton = (props: BeButtonProps) => {
  return (
    <View style={{...styles.button, ...props.style}}>
      <Button color={Colors.primary} {...props}/>
    </View>
  )
}

export default BeButton

const styles = StyleSheet.create({
  button: {
    width: 100
  }
})
