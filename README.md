# LinguaQuest - Language Learning App

A modern React Native application for learning new languages through interactive lessons and vocabulary building.

## Features

### 🏠 Home Screen
- Daily language lessons with 2-day completion windows
- Progress tracking for current lesson
- User level and experience system
- Daily quests and motivation quotes

### 📚 Lessons Screen
- View completed language lessons
- Track learning progress across different languages
- Share achievements with friends
- Lesson history and statistics

### 📖 Vocabulary Screen
- Personal vocabulary collection
- Word learning progress tracking
- Filter by learned/learning status
- Review and practice learned words

### 📊 Statistics Screen
- Learning progress overview
- Words learned counter
- Streak tracking
- Achievement badges
- Share learning statistics

### 🏆 Achievements & Badges
- Unlock achievements for learning milestones
- Collect badges for different accomplishments
- Progress tracking for various learning goals

## Technology Stack

- **React Native 0.80.0** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation between screens
- **Context API** - State management
- **Vector Icons** - Icon system

## Key Features

### Language Learning System
- **Multi-language support**: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean
- **Difficulty levels**: Beginner, Intermediate, Advanced
- **2-day lesson format**: Complete lessons within 2 days for optimal learning retention
- **Vocabulary tracking**: Learn and review words with progress tracking

### Gamification
- **Experience points**: Earn XP for completing lessons
- **Level system**: Progress through learning levels
- **Streak tracking**: Maintain daily learning streaks
- **Achievement system**: Unlock badges and achievements
- **Daily quests**: Complete daily learning challenges

### User Experience
- **Clean, modern UI**: Red and white color scheme with intuitive design
- **Progress visualization**: Visual progress bars and statistics
- **Motivational quotes**: Daily inspiration for language learning
- **Social sharing**: Share achievements and progress

## App Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── context/            # State management
├── types/              # TypeScript type definitions
├── constants/          # App constants and configuration
├── utils/              # Utility functions
├── data/               # Mock data and initial state
└── assets/             # Images, fonts, and other assets
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

3. For Android:
   ```bash
   npm run android
   ```

## Learning Philosophy

LinguaQuest is built on the principle that consistent, short learning sessions are more effective than long, infrequent study periods. The 2-day lesson format encourages regular practice while the gamification elements keep learners motivated and engaged.

## Future Enhancements

- Audio pronunciation features
- Spaced repetition algorithm for vocabulary
- Offline learning capabilities
- Social features and leaderboards
- Multiple learning modes (flashcards, quizzes, conversations)
- Progress analytics and insights

---

**LinguaQuest** - Every word is a step forward in your language learning journey! 🌍📚