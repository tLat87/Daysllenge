import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Achievement } from '../types';
import { textStyles } from '../utils/fontUtils';
import { COLORS } from '../constants';

interface AchievementCardProps {
  achievement: Achievement;
  onPress?: (achievement: Achievement) => void;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onPress }) => {
  const progressPercentage = (achievement.current / achievement.requirement) * 100;
  const isUnlocked = achievement.isUnlocked;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return COLORS.textSecondary;
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return COLORS.gold;
      default: return COLORS.textSecondary;
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return COLORS.border;
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return COLORS.gold;
      default: return COLORS.border;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'streak': return '🔥';
      case 'challenges': return '🎯';
      case 'time': return '⏰';
      case 'social': return '👥';
      case 'special': return '⭐';
      default: return '🏆';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { 
          borderColor: getRarityBorder(achievement.rarity),
          opacity: isUnlocked ? 1 : 0.6
        }
      ]}
      onPress={() => onPress?.(achievement)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: isUnlocked ? getRarityColor(achievement.rarity) : COLORS.border }
        ]}>
          <Text style={styles.achievementIcon}>
            {isUnlocked ? achievement.icon : getCategoryIcon(achievement.category)}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            isUnlocked && styles.unlockedTitle
          ]}>
            {achievement.name}
          </Text>
          <Text style={[
            styles.rarity,
            { color: getRarityColor(achievement.rarity) }
          ]}>
            {achievement.rarity.toUpperCase()}
          </Text>
        </View>
        {isUnlocked && (
          <View style={styles.unlockedBadge}>
            <Text style={styles.unlockedText}>✓</Text>
          </View>
        )}
      </View>

      <Text style={[
        styles.description,
        isUnlocked && styles.unlockedDescription
      ]}>
        {achievement.description}
      </Text>

      {!isUnlocked && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: getRarityColor(achievement.rarity)
                }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {achievement.current}/{achievement.requirement}
          </Text>
        </View>
      )}

      {isUnlocked && achievement.unlockedAt && (
        <Text style={styles.unlockedDate}>
          Unlocked {achievement.unlockedAt.toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...textStyles.body,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unlockedTitle: {
    color: COLORS.primary,
  },
  rarity: {
    ...textStyles.small,
    fontWeight: 'bold',
  },
  unlockedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlockedText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  unlockedDescription: {
    color: COLORS.text,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    ...textStyles.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  unlockedDate: {
    ...textStyles.small,
    color: COLORS.success,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AchievementCard;


