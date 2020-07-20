import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  style?: any
}

const Input = (props: InputProps) => {
  return (
    <TextInput {...props} style={{...styles.input, ...props.style}} />
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    minWidth: 40
  }
})
