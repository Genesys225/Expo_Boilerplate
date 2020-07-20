import React, { ReactNode } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import Colors from '../../config/colors'
import BeText from './BeText'

interface TextWContainerProps extends ViewProps {
  children: ReactNode
}

const TextWContainer = (props: TextWContainerProps) => {
  return (
    <View style={styles.container}>
      <BeText style={styles.number}>{props.children}</BeText>
    </View>
  )
}

export default TextWContainer

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    color: Colors.accent,
    fontSize: 22
  }
})
