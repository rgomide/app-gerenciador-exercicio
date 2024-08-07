import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const RoutineCard = ({ title, description }) => {
  return (
    <View
      style={{
        padding: 15,
        justifyContent: 'space-around',
        gap: 20,
        backgroundColor: '#222221',
        borderRadius: 20
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc} numberOfLines={3}>
        {description}
      </Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={{ color: '#fff', fontSize: 20 }}>iniciar rotina</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#F28B0C',
    fontSize: 28,
    fontWeight: 'bold'
  },

  desc: {
    color: '#C2BEBE',
    fontSize: 16
  },

  btn: {
    backgroundColor: '#F28B0C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 50
  }
})

export default RoutineCard
