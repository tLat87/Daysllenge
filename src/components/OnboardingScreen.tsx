import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import OnboardingProgressIndicator from './OnboardingProgressIndicator';
import { textStyles } from '../utils/fontUtils';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  title: string;
  bodyText: string;
  image: string; // emoji для начала
  onNext: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
  isLast?: boolean;
  currentIndex?: number;
  totalScreens?: number;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title,
  bodyText,
  image,
  onNext,
  onSkip,
  showSkip = true,
  isLast = false,
  currentIndex = 0,
  totalScreens = 3,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Skip button */}
      {showSkip && !isLast && (
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Main content */}
      <View style={styles.content}>
        {/* Image/Icon */}
       

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.bodyText}>{bodyText}</Text>
        </View>

        
      </View>
      <View style={styles.imageContainer}>
          <Image source={image} style={{ width: '100%', height: '100%', opacity: 1 }} />
        </View>
      {/* Progress indicator */}
      <OnboardingProgressIndicator 
        currentIndex={currentIndex} 
        totalScreens={totalScreens} 
      />

      {/* Next button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        {/* <TouchableOpacity style={styles.nextButton}> */}
          <Text style={styles.nextButtonIcon}>→</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    ...textStyles.body,
    color: '#666666',
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 50,
    alignItems: 'center',
    zIndex: 1,
    // paddingHorizontal: 40,
  },
  imageContainer: {
    width: '100%',
    position: 'absolute',
    bottom: -50,
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 0,
  },
  imageEmoji: {
    fontSize: 120,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...textStyles.title,
    color: '#000000',
    
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  bodyText: {
    ...textStyles.body,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  nextButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
