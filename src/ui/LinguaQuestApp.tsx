import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import LanguageOnboarding from './LanguageOnboarding';
import LanguageProfilePage from '../pages/LanguageProfilePage';
import LanguageNavigator from './LanguageNavigator';

const AppContainer: React.FC = () => {
  const { state, dispatch } = useApp();

  if (!state.hasCompletedOnboarding) {
    return (
      <View style={styles.container}>
        <LanguageOnboarding onComplete={() => {}} />
      </View>
    );
  }

  if (!state.hasCompletedProfileRegistration) {
    return (
      <View style={styles.container}>
        <LanguageProfilePage 
          onComplete={() => {
            dispatch({ type: 'COMPLETE_PROFILE_REGISTRATION' });
          }} 
        />
      </View>
    );
  }

  return <LanguageNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default AppContainer;
