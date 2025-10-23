import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DailyQuest } from '../types';
import { textStyles } from '../helpers/languageFontUtils';
import { COLORS } from '../constants';

interface DailyQuestCardProps {
  quest: DailyQuest;
  onComplete?: (quest: DailyQuest) => void;
}

const DailyLanguageQuest: React.FC<DailyQuestCardProps> = ({ quest, onComplete }) => {
  const progressPercentage = (quest.current / quest.target) * 100;
  const isCompleted = quest.isCompleted;
  const isExpired = new Date() > quest.expiresAt;

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'exercise': return '💪';
      case 'streak': return '🔥';
      case 'time': return '⏰';
      case 'social': return '👥';
      default: return '🎯';
    }
  };

  const getQuestColor = (type: string) => {
    switch (type) {
      case 'exercise': return COLORS.primary;
      case 'streak': return COLORS.warning;
      case 'time': return COLORS.success;
      case 'social': return '#9C27B0';
      default: return COLORS.primary;
    }
  };

  const formatTimeLeft = () => {
    const now = new Date();
    const diff = quest.expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else if (minutes > 0) {
      return `${minutes}m left`;
    } else {
      return 'Expired';
    }
  };

  return (
    <View style={[
      styles.container,
      isCompleted && styles.completedContainer,
      isExpired && !isCompleted && styles.expiredContainer
    ]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.questIcon}>{getQuestIcon(quest.type)}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            isCompleted && styles.completedText,
            isExpired && !isCompleted && styles.expiredText
          ]}>
            {quest.title}
          </Text>
          <Text style={[
            styles.timeLeft,
            isExpired && !isCompleted && styles.expiredText
          ]}>
            {formatTimeLeft()}
          </Text>
        </View>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>+{quest.reward.experience} XP</Text>
          <Text style={styles.rewardText}>+{quest.reward.points} P</Text>
        </View>
      </View>

      <Text style={[
        styles.description,
        isCompleted && styles.completedText,
        isExpired && !isCompleted && styles.expiredText
      ]}>
        {quest.description}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(progressPercentage, 100)}%`,
                backgroundColor: isCompleted ? COLORS.success : getQuestColor(quest.type)
              }
            ]} 
          />
        </View>
        <Text style={[
          styles.progressText,
          isCompleted && styles.completedText,
          isExpired && !isCompleted && styles.expiredText
        ]}>
          {quest.current}/{quest.target}
        </Text>
      </View>

      {!isCompleted && !isExpired && quest.current >= quest.target && (
        <TouchableOpacity 
          style={[styles.completeButton, { backgroundColor: getQuestColor(quest.type) }]}
          onPress={() => onComplete?.(quest)}
        >
          <Text style={styles.completeButtonText}>Complete Quest</Text>
        </TouchableOpacity>
      )}

      {isCompleted && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>✅ Completed</Text>
        </View>
      )}

      {isExpired && !isCompleted && (
        <View style={styles.expiredBadge}>
          <Text style={styles.expiredBadgeText}>⏰ Expired</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.borderRed,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    borderColor: COLORS.success,
  },
  expiredContainer: {
    backgroundColor: '#F5F5F5',
    borderColor: COLORS.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  questIcon: {
    fontSize: 20,
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
  timeLeft: {
    ...textStyles.small,
    color: COLORS.textSecondary,
  },
  rewardContainer: {
    alignItems: 'flex-end',
  },
  rewardText: {
    ...textStyles.small,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  description: {
    ...textStyles.caption,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  progressContainer: {
    marginBottom: 12,
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
  completeButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    ...textStyles.caption,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: COLORS.success,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedBadgeText: {
    ...textStyles.caption,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  expiredBadge: {
    backgroundColor: COLORS.textLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  expiredBadgeText: {
    ...textStyles.caption,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  completedText: {
    opacity: 0.7,
  },
  expiredText: {
    opacity: 0.5,
  },
});

export default DailyLanguageQuest;


