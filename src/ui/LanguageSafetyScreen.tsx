import React, { useState } from 'react';
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
import { textStyles } from '../helpers/languageFontUtils';

const { width, height } = Dimensions.get('window');

interface SafetyWarningScreenProps {
  onNext: () => void;
  onSkip?: () => void;
}

const SafetyWarningScreen: React.FC<SafetyWarningScreenProps> = ({ onNext, onSkip }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Skip button */}
      {/* {onSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )} */}

      {/* Main content */}
      <View style={styles.content}>
        {/* Warning icon */}
        <View style={styles.warningIconContainer}>
          <Image source={require('../languageAssets/languageImages/lessonError.png')} style={styles.warningIcon} />
        </View>

        {/* Text content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Safety Warning</Text>
          <Text style={styles.bodyText}>
            Please do not attempt the challenge if you are not confident in your abilities or if it could harm your health. Listen to your body and exercise safely.
          </Text>
        </View>

        {/* Agreement checkbox */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={handleAgree}>
          <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
            {isAgreed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            I agree and have no complaints in case of problems that may arise.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Next button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.nextButton, !isAgreed && styles.nextButtonDisabled]} 
          onPress={isAgreed ? onNext : undefined}
          disabled={!isAgreed}
        >
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  warningIconContainer: {
    marginBottom: 40,
  },
  warningIcon: {
    fontSize: 80,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    ...textStyles.title,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  bodyText: {
    ...textStyles.body,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#FF0000',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxText: {
    ...textStyles.caption,
    flex: 1,
    color: '#666666',
    lineHeight: 20,
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
  nextButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0.1,
  },
  nextButtonIcon: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SafetyWarningScreen;

