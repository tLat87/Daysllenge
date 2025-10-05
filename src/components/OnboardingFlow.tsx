import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingScreen from './OnboardingScreen';
import SafetyWarningScreen from './SafetyWarningScreen';
import { useApp } from '../context/AppContext';

interface OnboardingFlowProps {
  onComplete: () => void;
}

interface OnboardingData {
  title: string;
  bodyText: string;
  image: string;
}

const onboardingData: OnboardingData[] = [
  {
    title: 'Welcome to the 2Days Sport Challenge!',
    bodyText: 'Small steps make big changes. Start your first challenge today.',
    image: require('../assets/img/1.png'),
  },
  {
    title: '2-Day Challenges',
    bodyText: 'Choose a sport and take on the 2-day challenge: running, training, playing with friends—everything counts!',
    image: require('../assets/img/2.png'),
  },
  {
    title: 'Rewards and Motivation',
    bodyText: 'Collect badges, track your progress, and unlock new achievements. Your collection grows with you!',
    image: require('../assets/img/3.png'),
  },
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { dispatch } = useApp();
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < onboardingData.length) {
      setCurrentScreen(currentScreen + 1);
    } else {
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      onComplete();
    }
  };

  const handleSkip = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    onComplete();
  };

  const handleSafetyNext = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    onComplete();
  };

  const handleSafetySkip = () => {
    dispatch({ type: 'COMPLETE_ONBOARDING' });
    onComplete();
  };

  if (currentScreen < onboardingData.length) {
    const data = onboardingData[currentScreen];
    return (
      <OnboardingScreen
        title={data.title}
        bodyText={data.bodyText}
        image={data.image}
        onNext={handleNext}
        onSkip={handleSkip}
        showSkip={true}
        isLast={currentScreen === onboardingData.length - 1}
        currentIndex={currentScreen}
        totalScreens={onboardingData.length + 1} // +1 для экрана безопасности
      />
    );
  }

  return (
    <SafetyWarningScreen
      onNext={handleSafetyNext}
      onSkip={handleSafetySkip}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default OnboardingFlow;
