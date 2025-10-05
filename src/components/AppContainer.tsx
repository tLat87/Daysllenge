import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import OnboardingFlow from './OnboardingFlow';
import ProfileRegistrationScreen from '../screens/ProfileRegistrationScreen';
import MainNavigator from './MainNavigator';

const AppContainer: React.FC = () => {
  const { state, dispatch } = useApp();

  if (!state.hasCompletedOnboarding) {
    return (
      <View style={styles.container}>
        <OnboardingFlow onComplete={() => {}} />
      </View>
    );
  }

  if (!state.hasCompletedProfileRegistration) {
    return (
      <View style={styles.container}>
        <ProfileRegistrationScreen 
          onComplete={() => {
            dispatch({ type: 'COMPLETE_PROFILE_REGISTRATION' });
          }} 
        />
      </View>
    );
  }

  return <MainNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default AppContainer;
