import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  onShare?: () => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onShare }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.info}>
          {badge.receivedAt && (
            <Text style={styles.date}>{formatDate(badge.receivedAt)}</Text>
          )}
          <Text style={styles.name}>{badge.name}</Text>
          <Text style={styles.description}>{badge.description}</Text>
          {badge.isReceived && onShare && (
            <TouchableOpacity style={styles.shareButton} onPress={onShare}>
              <Text style={styles.shareIcon}>📤</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{badge.icon}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  shareButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  shareIcon: {
    fontSize: 20,
    color: '#FF0000',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    marginLeft: 15,
  },
  icon: {
    fontSize: 30,
  },
});

export default BadgeCard;


