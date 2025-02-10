import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eat the Caper</Text>
      <Text style={styles.dedication}>for my Zachy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dedication: {
    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default SplashScreen;
