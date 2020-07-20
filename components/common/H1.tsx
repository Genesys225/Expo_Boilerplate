import React, { ReactNode } from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'

interface H1Props extends TextProps {
  style?: TextStyle,
  children: ReactNode|string|number|Text|any[]
}

const H1 = (props: H1Props) => {
  return (
    <Text style={{ ...styles.body, ...props.style}}>{props.children}</Text>
  )
}

export default H1

const styles = StyleSheet.create({
  body: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  }
})
