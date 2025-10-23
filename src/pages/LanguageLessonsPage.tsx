import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  Share,
} from 'react-native';
import { useApp } from '../state/LanguageAppContext';
import { textStyles } from '../helpers/languageFontUtils';

const ChallengesScreen: React.FC = () => {
  const { state, dispatch } = useApp();

  const handleDeleteLesson = (lessonId: string) => {
    Alert.alert(
      'Delete lesson?',
      'Are you sure you want to delete this lesson from your history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            // Здесь можно добавить логику удаления
            console.log('Delete lesson:', lessonId);
          },
        },
      ]
    );
  };

  const handleShareLesson = async (lesson: any) => {
    try {
      await Share.share({
        message: `I completed the lesson: ${lesson.title} in ${lesson.language}`,
        title: 'LinguaQuest Language Learning',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderLessonItem = ({ item }: { item: any }) => (
    <View style={styles.challengeItem}>
      <View style={styles.challengeInfo}>
        <Text style={styles.challengeDescription}>{item.title}</Text>
        <Text style={styles.lessonLanguage}>{item.language} • {item.level}</Text>
        <Text style={styles.lessonWords}>Words learned: {item.wordsLearned}/{item.totalWords}</Text>
        <Text style={styles.completionDate}>
          Completed {formatDate(item.completedAt!)}
        </Text>
        <Text style={styles.completionTime}>Time {item.actualDuration} minutes</Text>
      </View>
      <View style={styles.challengeActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShareLesson(item)}
        >
          <Text style={styles.actionIcon}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteLesson(item.id)}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed lessons</Text>
      </View>

      {state.completedLessons.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No completed lessons yet</Text>
          <Text style={styles.emptySubtext}>Complete your first lesson to see it here!</Text>
        </View>
      ) : (
        <FlatList
          data={state.completedLessons}
          renderItem={renderLessonItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    ...textStyles.subtitle,
    color: '#000000',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  challengeItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeDescription: {
    ...textStyles.body,
    color: '#000000',
    marginBottom: 4,
  },
  lessonLanguage: {
    ...textStyles.caption,
    color: '#FF0000',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  lessonWords: {
    ...textStyles.caption,
    color: '#666666',
    marginBottom: 8,
  },
  completionDate: {
    ...textStyles.caption,
    color: '#666666',
    marginBottom: 4,
  },
  completionTime: {
    ...textStyles.caption,
    color: '#666666',
  },
  challengeActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 20,
  },
  actionIcon: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    ...textStyles.subtitle,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    ...textStyles.caption,
    color: '#666666',
    textAlign: 'center',
  },
});

export default ChallengesScreen;

