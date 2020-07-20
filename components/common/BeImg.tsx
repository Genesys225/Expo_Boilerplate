import React from 'react'
import { StyleSheet, View, Image, ImageProps, ViewStyle, ImageStyle } from 'react-native'

interface BeImgProps extends Omit<ImageProps, 'style'> {
  style?: ViewStyle
}

const BeImg = (props: BeImgProps) => {
  const propStyles = props.style;

  return (
    <View style={{...styles.imageContainer, ...propStyles}}>
      <Image {...props} style={styles.image} />
    </View>
  )
}

export default BeImg

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden"
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
