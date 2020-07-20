import React, { ReactNode } from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

interface BeTextProps extends TextProps {
  children: ReactNode|string|number|Text|any[],
  style?: TextStyle
}

const BeText = (props: BeTextProps) => {
  return (
    <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
  )
}

export default BeText

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans',
    fontSize: 16
  }
})
