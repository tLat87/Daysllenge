import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import LanguageBadgeCard from '../ui/LanguageBadgeCard';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

const AchievementsScreen: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'unlocked' | 'locked'>('unlocked');

  const unlockedAchievements = state.achievements.filter(achievement => achievement.isUnlocked);
  const lockedAchievements = state.achievements.filter(achievement => !achievement.isUnlocked);

  const handleAchievementPress = (achievement: any) => {
    if (achievement.isUnlocked) {
      Alert.alert(
        achievement.name,
        `${achievement.description}\n\nUnlocked: ${achievement.unlockedAt?.toLocaleDateString() || 'Recently'}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        achievement.name,
        `${achievement.description}\n\nProgress: ${achievement.current}/${achievement.requirement}`,
        [{ text: 'OK' }]
      );
    }
  };

  const renderAchievementItem = ({ item }: { item: any }) => (
    <LanguageBadgeCard
      achievement={item}
      onPress={handleAchievementPress}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {activeTab === 'unlocked' ? 'No achievements unlocked yet' : 'All achievements unlocked!'}
      </Text>
      <Text style={styles.emptySubtext}>
        {activeTab === 'unlocked' 
          ? 'Complete challenges to unlock achievements!' 
          : 'Congratulations! You\'ve unlocked all achievements!'
        }
      </Text>
    </View>
  );

  const getTotalProgress = () => {
    const total = state.achievements.length;
    const unlocked = unlockedAchievements.length;
    return { unlocked, total, percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0 };
  };

  const progress = getTotalProgress();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {progress.unlocked}/{progress.total} ({progress.percentage}%)
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress.percentage}%` }
            ]} 
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'unlocked' && styles.activeTab]}
          onPress={() => setActiveTab('unlocked')}
        >
          <Text style={[styles.tabText, activeTab === 'unlocked' && styles.activeTabText]}>
            Unlocked ({unlockedAchievements.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'locked' && styles.activeTab]}
          onPress={() => setActiveTab('locked')}
        >
          <Text style={[styles.tabText, activeTab === 'locked' && styles.activeTabText]}>
            Locked ({lockedAchievements.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'unlocked' ? (
        unlockedAchievements.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={unlockedAchievements}
            renderItem={renderAchievementItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )
      ) : (
        <FlatList
          data={lockedAchievements}
          renderItem={renderAchievementItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    ...textStyles.subtitle,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressText: {
    ...textStyles.caption,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  activeTabText: {
    ...textStyles.caption,
    color: COLORS.background,
  },
  listContainer: {
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    ...textStyles.subtitle,
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptySubtext: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AchievementsScreen;


