import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { StyleSheet, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../config/colors';

const BeHeaderBtn = (props:any) => {
  return (
    <HeaderButton 
      {...props} 
      IconComponent={Ionicons} 
      iconSize={24}
      color={
        Platform.OS === 'android' 
          ? 'white'
          : Colors.primary
      }
    />
  )
}

export default BeHeaderBtn

const styles = StyleSheet.create({})
