import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { User } from '../types';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

interface UserLevelCardProps {
  user: User;
  onPress?: () => void;
}

const LanguageLevelCard: React.FC<UserLevelCardProps> = ({ user, onPress }) => {
  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return COLORS.bronze;
      case 'Silver': return COLORS.silver;
      case 'Gold': return COLORS.gold;
      case 'Platinum': return '#E5E4E2';
      case 'Diamond': return '#B9F2FF';
      default: return COLORS.bronze;
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      case 'Platinum': return '💎';
      case 'Diamond': return '💠';
      default: return '🥉';
    }
  };

  const progressPercentage = (user.experience / user.experienceToNextLevel) * 100;

  return (
    <TouchableOpacity 
      style={[styles.container, { borderColor: getRankColor(user.rank) }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.levelInfo}>
          <Text style={styles.levelText}>Level {user.level}</Text>
          <Text style={styles.rankText}>
            {getRankIcon(user.rank)} {user.rank}
          </Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{user.points}</Text>
          <Text style={styles.pointsLabel}>Points</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: getRankColor(user.rank)
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {user.experience}/{user.experienceToNextLevel} XP
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.longestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.totalExperience}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    ...textStyles.subtitle,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rankText: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  pointsText: {
    ...textStyles.subtitle,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  pointsLabel: {
    ...textStyles.small,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    ...textStyles.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.body,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    ...textStyles.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default LanguageLevelCard;


