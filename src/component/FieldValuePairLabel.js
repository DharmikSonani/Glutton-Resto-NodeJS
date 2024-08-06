import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'

const FieldValuePairLabel = ({
  field,
  value,
  style,
  fontSize,
}) => {
  return (
    <View style={[styles.Container, style && style]}>
      <Text style={[styles.FieldText, fontSize && { fontSize: fontSize }]} numberOfLines={1}>{field}</Text>
      {value && <Text style={[styles.ValueText, fontSize && { fontSize: fontSize }]} numberOfLines={1}>{value}</Text>}
    </View>
  )
}

export default FieldValuePairLabel

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  FieldText: {
    color: COLOR.BLACK,
    fontSize: 12,
    marginRight: 10,
  },
  ValueText: {
    flex: 1,
    color: COLOR.BLACK_60,
    fontSize: 12,
    textAlign: 'right',
  },
})