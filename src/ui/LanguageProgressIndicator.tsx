import React from 'react';
import { View, StyleSheet } from 'react-native';

interface OnboardingProgressIndicatorProps {
  currentIndex: number;
  totalScreens: number;
}

const LanguageProgressIndicator: React.FC<OnboardingProgressIndicatorProps> = ({
  currentIndex,
  totalScreens,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalScreens }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF0000',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: '#E0E0E0',
  },
});

export default LanguageProgressIndicator;


