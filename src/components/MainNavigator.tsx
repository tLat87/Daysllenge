import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import StatsScreen from '../screens/StatsScreen';
import BadgesScreen from '../screens/BadgesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MainNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'challenges':
        return <ChallengesScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'badges':
        return <BadgesScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      <BottomTabNavigator activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
  },
});

export default MainNavigator;
