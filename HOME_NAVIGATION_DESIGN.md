# Home Screen and Navigation Design Update

## Overview

Updated the Home screen and Bottom Tab Navigator to match the provided design with a modern, clean interface featuring user profile, challenge cards, motivation section, and redesigned navigation.

## Home Screen Changes

### 1. Header Section
- **Profile Image**: Circular profile picture (50x50px) on the left
- **Greeting**: "Hello, [User Name]" in bold text
- **Stats Icon**: Red outlined square icon with chart symbol on the right

### 2. Challenge Card
- **Red Background**: Prominent red card for the main challenge
- **Title**: "2-day challenge:" in bold white text
- **Description**: Challenge description in white text
- **Timer Container**: White rounded container with:
  - "Until the end of the challenge:" label in black
  - Time remaining in bold black text
- **Accept Button**: White button with "Accept the challenge" text

### 3. Motivation Section
- **Title**: "Motivation for the day:" in bold black text
- **White Card**: Clean white card with light gray border
- **Motivation Text**: Red, bold, uppercase text
- **Share Button**: Red button with share icon and "Share" text

## Bottom Tab Navigator Changes

### 1. Layout Structure
- **Logo Section**: Left side with "2Days Sport Challenge" logo
- **Navigation Icons**: Right side with 4 navigation icons
- **Removed Stats**: No longer includes statistics tab

### 2. Logo Design
- **White Box**: Rounded white container with gray border
- **Red Text**: "2Days", "Sport", "Challenge" in red, bold text
- **Stacked Layout**: Three lines of text vertically aligned

### 3. Navigation Icons
- **Home**: 🏠 (red when active, gray when inactive)
- **Challenges**: ⚡️ (gray)
- **Badges**: ✓ (gray)
- **Settings**: ⚙️ (gray)

## Code Implementation

### Home Screen Updates

#### Header with Profile
```typescript
<View style={styles.header}>
  <View style={styles.profileSection}>
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
    <Text style={styles.greeting}>Hello, {state.user.name}</Text>
  </View>
  <TouchableOpacity style={styles.statsIconButton}>
    <Text style={styles.statsIcon}>📊</Text>
  </TouchableOpacity>
</View>
```

#### Challenge Card with Timer
```typescript
<View style={styles.challengeCard}>
  <Text style={styles.challengeTitle}>2-day challenge:</Text>
  <Text style={styles.challengeDescription}>{state.currentChallenge.title}</Text>
  
  <View style={styles.timerContainer}>
    <Text style={styles.timerLabel}>Until the end of the challenge:</Text>
    <Text style={styles.timerValue}>{timeLeft}</Text>
  </View>
  
  <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptChallenge}>
    <Text style={styles.acceptButtonText}>Accept the challenge</Text>
  </TouchableOpacity>
</View>
```

#### Motivation Section
```typescript
<View style={styles.motivationSection}>
  <Text style={styles.motivationTitle}>Motivation for the day:</Text>
  <View style={styles.motivationCard}>
    <Text style={styles.motivationText}>{state.motivations[0]?.text}</Text>
    <TouchableOpacity style={styles.motivationShareButton} onPress={handleShareMotivation}>
      <Text style={styles.motivationShareIcon}>↗</Text>
      <Text style={styles.motivationShareText}>Share</Text>
    </TouchableOpacity>
  </View>
</View>
```

### Bottom Tab Navigator Updates

#### Logo and Navigation Structure
```typescript
<View style={styles.container}>
  {/* Logo Section */}
  <View style={styles.logoContainer}>
    <View style={styles.logoBox}>
      <Text style={styles.logoText}>2Days</Text>
      <Text style={styles.logoText}>Sport</Text>
      <Text style={styles.logoText}>Challenge</Text>
    </View>
  </View>
  
  {/* Navigation Icons */}
  <View style={styles.navigationContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={styles.tab}
        onPress={() => onTabPress(tab.key)}
      >
        <Text style={[
          styles.tabIcon,
          activeTab === tab.key && styles.activeTabIcon
        ]}>
          {tab.icon}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>
```

## Styling Details

### Home Screen Styles

#### Profile Section
```typescript
profileSection: {
  flexDirection: 'row',
  alignItems: 'center',
},
profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
},
greeting: {
  ...textStyles.subtitle,
  color: '#000000',
  fontWeight: 'bold',
},
statsIconButton: {
  width: 40,
  height: 40,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#FF0000',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
},
```

#### Challenge Card
```typescript
challengeCard: {
  backgroundColor: '#FF0000',
  marginHorizontal: 20,
  marginVertical: 10,
  padding: 20,
  borderRadius: 12,
},
timerContainer: {
  backgroundColor: '#ffffff',
  borderRadius: 8,
  padding: 12,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
```

#### Motivation Section
```typescript
motivationSection: {
  marginHorizontal: 20,
  marginVertical: 10,
},
motivationCard: {
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 12,
  padding: 20,
},
motivationText: {
  ...textStyles.body,
  color: '#FF0000',
  marginBottom: 15,
  fontWeight: 'bold',
  textTransform: 'uppercase',
},
```

### Bottom Tab Navigator Styles

#### Logo Section
```typescript
logoContainer: {
  marginRight: 20,
},
logoBox: {
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 8,
  padding: 8,
  alignItems: 'center',
},
logoText: {
  ...textStyles.caption,
  color: '#FF0000',
  fontWeight: 'bold',
  lineHeight: 12,
},
```

#### Navigation Icons
```typescript
navigationContainer: {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-around',
},
tabIcon: {
  fontSize: 24,
  color: '#999999',
},
activeTabIcon: {
  color: '#FF0000',
},
```

## Color Scheme

### Primary Colors
- **Red**: #FF0000 (challenge cards, active states, logo)
- **White**: #ffffff (backgrounds, cards)
- **Black**: #000000 (text, labels)
- **Gray**: #999999 (inactive icons, secondary text)
- **Light Gray**: #e0e0e0 (borders, dividers)

### Component Colors
- **Challenge Card**: Red background with white text
- **Timer Container**: White background with black text
- **Motivation Card**: White background with red text
- **Logo Box**: White background with red text
- **Active Tab**: Red icon
- **Inactive Tab**: Gray icon

## Typography

### Font Usage
- **DMMono-Italic**: Used throughout the application
- **Bold**: For titles, important text, and active states
- **Regular**: For body text and descriptions
- **Uppercase**: For motivation text

### Text Sizes
- **Titles**: subtitle size with bold weight
- **Body Text**: body size with regular weight
- **Labels**: caption size with regular weight
- **Logo**: caption size with bold weight

## Layout Structure

### Home Screen Layout
1. **Header**: Profile + greeting + stats icon
2. **Challenge Card**: Red card with timer and button
3. **Motivation Section**: Title + white card with share button
4. **Bottom Navigation**: Logo + navigation icons

### Navigation Layout
1. **Logo Section**: Left side with app branding
2. **Navigation Icons**: Right side with 4 tabs
3. **Active State**: Red color for current tab
4. **Inactive State**: Gray color for other tabs

## User Experience

### Visual Hierarchy
- **Challenge Card**: Most prominent with red background
- **Profile Section**: Personal greeting and photo
- **Motivation**: Secondary content with share option
- **Navigation**: Clear branding and tab selection

### Interaction Design
- **Touch Targets**: Adequate size for easy tapping
- **Visual Feedback**: Clear active/inactive states
- **Consistent Styling**: Unified design language
- **Accessibility**: High contrast and readable text

## Responsive Design

### Screen Adaptation
- **Flexible Layout**: Adapts to different screen sizes
- **Consistent Spacing**: 20px horizontal margins
- **Proper Scaling**: Icons and text scale appropriately
- **Touch-Friendly**: Minimum 40px touch targets

### Content Flow
- **Vertical Scrolling**: Natural content flow
- **Fixed Navigation**: Always accessible at bottom
- **Header Persistence**: Profile and stats always visible
- **Card-Based Layout**: Easy to scan and understand

## Future Enhancements

### Potential Improvements
- [ ] Animated transitions between tabs
- [ ] Progress animations for challenges
- [ ] Customizable motivation messages
- [ ] Profile picture editing
- [ ] Dark mode support
- [ ] Accessibility improvements
- [ ] Haptic feedback for interactions
- [ ] Gesture-based navigation
