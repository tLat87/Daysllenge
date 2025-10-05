# Statistics Screen Design Update

## Overview

Updated the Statistics screen to match the provided design with a clean, modern interface featuring user profile, statistics cards, progress indicator, and share functionality.

## Design Features

### 1. Header Section
- **Back Button**: Left-pointing arrow for navigation
- **Title**: "Statistics" centered
- **Clean Layout**: Balanced header with proper spacing

### 2. User Profile Section
- **Profile Image**: Circular profile picture (60x60px)
- **Greeting**: "Hello, [User Name]" in bold
- **Fallback**: Default user icon if no profile picture

### 3. Statistics Summary Card
- **White Card**: Clean white background with shadow
- **Three Statistics**:
  - Number of completed challenges
  - Number of awards received
  - Activity by day
- **Red Values**: Important numbers highlighted in red
- **Gray Labels**: Descriptive text in gray

### 4. Challenge Progress Card
- **Progress Circle**: Circular indicator with red border
- **Progress Text**: "X/15" format showing current progress
- **Label**: "Challenge progress" description

### 5. Share Statistics Button
- **Red Button**: Prominent red background
- **Share Icon**: Arrow icon for sharing
- **White Text**: "Share statistics" label
- **Bottom Position**: Fixed at bottom of screen

## Code Implementation

### 1. Updated Imports
```typescript
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
```

### 2. Share Functionality
```typescript
const handleShareStatistics = async () => {
  try {
    const message = `My 2Days Sport Challenge Statistics:
• Completed Challenges: ${totalChallenges}
• Awards Received: ${totalBadges}
• Days Active: ${calculateDaysActive()}
• Challenge Progress: ${totalChallenges}/15

Keep pushing yourself! 💪`;

    await Share.share({
      message: message,
      title: '2Days Sport Challenge Statistics',
    });
  } catch (error) {
    console.log('Error sharing statistics:', error);
  }
};
```

### 3. Profile Image Handling
```typescript
<View style={styles.profileImageContainer}>
  {state.user.profilePicture ? (
    <Image 
      source={{ uri: state.user.profilePicture }} 
      style={styles.profileImage}
      resizeMode="cover"
    />
  ) : (
    <View style={styles.profileImagePlaceholder}>
      <Text style={styles.profileImageText}>👤</Text>
    </View>
  )}
</View>
```

### 4. Statistics Display
```typescript
<View style={styles.statsCard}>
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>Number of completed challenges:</Text>
    <Text style={styles.statValue}>{totalChallenges}</Text>
  </View>
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>Number of awards received:</Text>
    <Text style={styles.statValue}>{totalBadges}</Text>
  </View>
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>Activity by day:</Text>
    <Text style={styles.statValue}>{calculateDaysActive()} days</Text>
  </View>
</View>
```

### 5. Progress Indicator
```typescript
<View style={styles.progressCard}>
  <View style={styles.progressContainer}>
    <View style={styles.progressCircle}>
      <Text style={styles.progressText}>{totalChallenges}/15</Text>
    </View>
  </View>
  <Text style={styles.progressLabel}>Challenge progress</Text>
</View>
```

## Styling Details

### Color Scheme
- **Background**: Light gray (#f5f5f5)
- **Cards**: White (#ffffff)
- **Primary**: Red (#FF0000)
- **Text**: Black (#000000)
- **Secondary Text**: Gray (#666666)

### Typography
- **Headers**: Bold, larger text
- **Labels**: Regular weight, gray color
- **Values**: Bold, red color for emphasis
- **Font**: DMMono-Italic throughout

### Layout
- **Padding**: Consistent 20px horizontal padding
- **Margins**: 15px between cards
- **Border Radius**: 12px for modern look
- **Shadows**: Subtle elevation for cards

### Component Sizes
- **Profile Image**: 60x60px
- **Progress Circle**: 60x60px
- **Back Button**: 40x40px
- **Share Button**: Full width with 15px vertical padding

## Responsive Design

### Screen Adaptation
- **Flexible Layout**: Adapts to different screen sizes
- **Scrollable Content**: Handles overflow gracefully
- **Fixed Elements**: Header and share button stay in place

### Touch Targets
- **Minimum Size**: 40x40px for touch targets
- **Accessibility**: Proper spacing for easy interaction
- **Visual Feedback**: Clear button states

## User Experience

### Navigation
- **Back Button**: Clear navigation path
- **Intuitive Layout**: Logical information hierarchy
- **Visual Hierarchy**: Important information stands out

### Information Display
- **Clear Labels**: Descriptive text for all statistics
- **Highlighted Values**: Red color draws attention
- **Progress Visualization**: Circular progress indicator
- **Real-time Data**: Statistics update based on user activity

### Sharing
- **Rich Content**: Detailed statistics in share message
- **Motivational**: Encouraging message included
- **Easy Access**: Prominent share button
- **Cross-platform**: Works on iOS and Android

## Data Sources

### Statistics Calculation
- **Completed Challenges**: From `state.completedChallenges.length`
- **Awards Received**: From `state.badges.filter(badge => badge.isReceived).length`
- **Days Active**: Calculated from registration date
- **Progress**: Current challenges vs. target (15)

### Real-time Updates
- **Dynamic Values**: Statistics update as user progresses
- **Accurate Data**: Based on actual user activity
- **Consistent State**: Synchronized with app state

## Accessibility

### Screen Reader Support
- **Descriptive Labels**: Clear text for all elements
- **Logical Order**: Proper reading sequence
- **Alternative Text**: For images and icons

### Visual Accessibility
- **High Contrast**: Clear color differences
- **Readable Text**: Appropriate font sizes
- **Clear Icons**: Recognizable symbols

## Performance

### Optimization
- **Efficient Rendering**: Minimal re-renders
- **Image Handling**: Proper image loading and caching
- **Memory Management**: Clean component lifecycle

### Loading States
- **Graceful Fallbacks**: Default content when data unavailable
- **Error Handling**: Proper error management
- **Smooth Transitions**: Fluid user experience

## Future Enhancements

### Potential Improvements
- [ ] Animated progress circle
- [ ] More detailed statistics
- [ ] Historical data charts
- [ ] Achievement highlights
- [ ] Social comparison features
- [ ] Export functionality
- [ ] Customizable statistics
- [ ] Goal setting integration

