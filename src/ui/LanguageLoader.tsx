import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { textStyles } from '../helpers/languageFontUtils';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'large' 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#FF0000" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  message: {
    ...textStyles.body,
    marginTop: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default LoadingSpinner;

