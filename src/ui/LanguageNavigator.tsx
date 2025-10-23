import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LanguageTabNavigator from './LanguageTabNavigator';
import LanguageHomePage from '../pages/LanguageHomePage';
import LanguageLessonsPage from '../pages/LanguageLessonsPage';
import LanguageVocabularyPage from '../pages/LanguageVocabularyPage';
import LanguageAchievementsPage from '../pages/LanguageAchievementsPage';
import LanguageLeaderboardPage from '../pages/LanguageLeaderboardPage';
import LanguageNotificationsPage from '../pages/LanguageNotificationsPage';
import LanguageBadgesPage from '../pages/LanguageBadgesPage';
import LanguageSettingsPage from '../pages/LanguageSettingsPage';
import { COLORS } from '../constants';

const LanguageNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <LanguageHomePage />;
      case 'lessons':
        return <LanguageLessonsPage />;
      case 'vocabulary':
        return <LanguageVocabularyPage />;
      case 'achievements':
        return <LanguageAchievementsPage />;
      case 'leaderboard':
        return <LanguageLeaderboardPage />;
      case 'notifications':
        return <LanguageNotificationsPage />;
      case 'badges':
        return <LanguageBadgesPage />;
      case 'settings':
        return <LanguageSettingsPage />;
      default:
        return <LanguageHomePage />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      <LanguageTabNavigator activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
  },
});

export default LanguageNavigator;
