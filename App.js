import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GameScreen from './GameScreen';
import SplashScreen from './SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  return (
    <View style={styles.container}>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <GameScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
