/**
 * 2Days Sport Challenge App
 * A simple and motivating way to add sport to your life
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import AppContainer from './src/components/AppContainer';

function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <AppContainer />
      </View>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
