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
import { useApp } from '../context/AppContext';
import { textStyles } from '../utils/fontUtils';
import { COLORS } from '../constants';

const VocabularyScreen: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'learned' | 'learning'>('all');

  const learnedWords = state.vocabulary.filter(word => word.isLearned);
  const learningWords = state.vocabulary.filter(word => !word.isLearned);

  const handleLearnWord = (wordId: string) => {
    dispatch({ type: 'LEARN_VOCABULARY_WORD', payload: wordId });
    Alert.alert('Word Learned!', 'Great job! You\'ve learned a new word!');
  };

  const handleReviewWord = (word: any) => {
    Alert.alert(
      word.word,
      `Translation: ${word.translation}\n\nLanguage: ${word.language}\nDifficulty: ${word.difficulty}\n\nTimes reviewed: ${word.timesReviewed}`,
      [
        { text: 'OK' },
        ...(word.isLearned ? [] : [{ text: 'Mark as Learned', onPress: () => handleLearnWord(word.id) }])
      ]
    );
  };

  const renderWordItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.wordItem, item.isLearned && styles.learnedWordItem]} 
      onPress={() => handleReviewWord(item)}
    >
      <View style={styles.wordInfo}>
        <Text style={[styles.wordText, item.isLearned && styles.learnedWordText]}>{item.word}</Text>
        <Text style={[styles.translationText, item.isLearned && styles.learnedTranslationText]}>{item.translation}</Text>
        <Text style={styles.languageText}>{item.language} • {item.difficulty}</Text>
        {item.isLearned && (
          <Text style={styles.learnedBadge}>✅ Learned</Text>
        )}
      </View>
      <View style={styles.wordActions}>
        <Text style={styles.reviewCount}>{item.timesReviewed} reviews</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        {activeTab === 'all' ? 'No words in vocabulary yet' : 
         activeTab === 'learned' ? 'No words learned yet' : 'No words to learn yet'}
      </Text>
      <Text style={styles.emptySubtext}>
        {activeTab === 'all' ? 'Complete lessons to add words to your vocabulary!' : 
         activeTab === 'learned' ? 'Start learning to see your progress here!' : 'Complete lessons to get new words!'}
      </Text>
    </View>
  );

  const getCurrentWords = () => {
    switch (activeTab) {
      case 'learned': return learnedWords;
      case 'learning': return learningWords;
      default: return state.vocabulary;
    }
  };

  const currentWords = getCurrentWords();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vocabulary</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {learnedWords.length}/{state.vocabulary.length} learned
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${state.vocabulary.length > 0 ? (learnedWords.length / state.vocabulary.length) * 100 : 0}%` }
            ]} 
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All ({state.vocabulary.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'learned' && styles.activeTab]}
          onPress={() => setActiveTab('learned')}
        >
          <Text style={[styles.tabText, activeTab === 'learned' && styles.activeTabText]}>
            Learned ({learnedWords.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'learning' && styles.activeTab]}
          onPress={() => setActiveTab('learning')}
        >
          <Text style={[styles.tabText, activeTab === 'learning' && styles.activeTabText]}>
            Learning ({learningWords.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {currentWords.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={currentWords}
          renderItem={renderWordItem}
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
  statsContainer: {
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statsText: {
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
    paddingHorizontal: 8,
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
    textAlign: 'center',
  },
  activeTabText: {
    ...textStyles.caption,
    color: COLORS.background,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  wordItem: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: COLORS.shadow,
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
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  learnedWordItem: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.backgroundSecondary,
  },
  wordInfo: {
    flex: 1,
  },
  wordText: {
    ...textStyles.subtitle,
    color: COLORS.text,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  learnedWordText: {
    color: COLORS.success,
  },
  translationText: {
    ...textStyles.body,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  learnedTranslationText: {
    color: COLORS.text,
  },
  languageText: {
    ...textStyles.caption,
    color: COLORS.primary,
    marginBottom: 4,
  },
  learnedBadge: {
    ...textStyles.caption,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  wordActions: {
    alignItems: 'flex-end',
  },
  reviewCount: {
    ...textStyles.caption,
    color: COLORS.textLight,
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

export default VocabularyScreen;
