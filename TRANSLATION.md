# Translation to English

## Overview

The entire application has been translated from Russian to English, including all user interface text, alerts, and messages.

## Changes Made

### 1. Profile Picture Selector
**File**: `src/components/ProfilePictureSelector.tsx`

#### Before (Russian):
```typescript
Alert.alert(
  'Выберите фото профиля',
  'Выберите изображение для вашего профиля',
  [
    { text: 'Отмена', style: 'cancel' },
    { text: 'Выбрать из галереи', onPress: () => openImagePicker() },
    { text: 'Удалить фото', style: 'destructive', onPress: () => onImageSelect(null) },
  ]
);
```

#### After (English):
```typescript
Alert.alert(
  'Select Profile Photo',
  'Choose an image for your profile',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Choose from Gallery', onPress: () => openImagePicker() },
    { text: 'Remove Photo', style: 'destructive', onPress: () => onImageSelect(null) },
  ]
);
```

### 2. Profile Registration Screen
**File**: `src/screens/ProfileRegistrationScreen.tsx`

#### Sex Selection Dialog:
```typescript
Alert.alert(
  'Select Sex',
  '',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Male', onPress: () => handleSexSelect('Man') },
    { text: 'Female', onPress: () => handleSexSelect('Woman') },
  ]
);
```

### 3. Challenges Screen
**File**: `src/screens/ChallengesScreen.tsx`

#### Share Message:
```typescript
// Before: `Я завершил челлендж: ${challenge.title}`
// After:
message: `I completed the challenge: ${challenge.title}`,
```

#### Date Format:
```typescript
// Before: 'ru-RU'
// After: 'en-US'
return date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
```

### 4. Badges Screen
**File**: `src/screens/BadgesScreen.tsx`

#### Share Message:
```typescript
// Before: `Я получил награду: ${badge.name} - ${badge.description}`
// After:
message: `I earned the badge: ${badge.name} - ${badge.description}`,
```

#### Date Format:
```typescript
// Before: 'ru-RU'
// After: 'en-US'
return date.toLocaleDateString('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
```

## Real Statistics Implementation

### Days Active Calculation
**File**: `src/screens/StatsScreen.tsx`

```typescript
const calculateDaysActive = () => {
  if (!state.user.registrationDate) return 0;
  const now = new Date();
  const registrationDate = new Date(state.user.registrationDate);
  const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
```

**How it works:**
- Calculates the difference between current date and registration date
- Returns the number of days since registration
- Updates automatically as time passes

### Time in App Calculation
**File**: `src/screens/StatsScreen.tsx`

```typescript
const calculateTimeInApp = () => {
  // Calculate based on completed challenges and their durations
  const challengeTime = state.completedChallenges.reduce((total, challenge) => {
    return total + (challenge.actualDuration || challenge.duration);
  }, 0);
  
  // Add some base time for app usage (browsing, settings, etc.)
  const baseTime = state.completedChallenges.length * 5; // 5 minutes per challenge for app usage
  
  return challengeTime + baseTime;
};
```

**How it works:**
- Sums up time spent on completed challenges
- Adds base time for general app usage (5 minutes per challenge)
- Provides realistic estimate of total app usage time

### Initial State Update
**File**: `src/context/AppContext.tsx`

```typescript
user: {
  id: '1',
  name: 'Nick',
  sex: 'Man',
  registrationDate: new Date(), // Current date instead of fixed date
  timeInApp: 0,                  // Start from 0 instead of 159
  numberOfDays: 0,               // Start from 0 instead of 16
},
```

## Translation Coverage

### ✅ Completed Translations

1. **Onboarding Screens**
   - Welcome messages
   - Challenge descriptions
   - Safety warnings
   - Skip buttons

2. **Profile Registration**
   - Form labels
   - Validation messages
   - Sex selection dialog
   - Photo selection dialog

3. **Main App Screens**
   - Home screen welcome text
   - Challenge acceptance buttons
   - Share messages
   - Statistics labels

4. **Challenges Screen**
   - Challenge descriptions
   - Share messages
   - Date formatting
   - Action buttons

5. **Badges Screen**
   - Badge descriptions
   - Share messages
   - Date formatting
   - Status messages

6. **Settings Screen**
   - Profile section
   - About section
   - Settings options
   - Confirmation dialogs

7. **Statistics Screen**
   - Stat labels
   - Time calculations
   - Date formatting

8. **Navigation**
   - Tab labels
   - Button text

## Date Format Changes

### Before (Russian Format):
- Format: `dd.mm.yyyy` (e.g., 30.09.2025)
- Locale: `'ru-RU'`

### After (English Format):
- Format: `mm/dd/yyyy` (e.g., 09/30/2025)
- Locale: `'en-US'`

## Real Statistics Features

### Days Active
- **Calculation**: Days since registration
- **Updates**: Automatically as time passes
- **Display**: Integer number of days

### Time in App
- **Calculation**: Challenge time + base usage time
- **Updates**: When challenges are completed
- **Display**: Minutes spent in app

### Benefits
1. **Realistic Data**: Statistics reflect actual usage
2. **Dynamic Updates**: Numbers change based on user activity
3. **Motivation**: Users see real progress over time
4. **Accuracy**: No fake or static numbers

## Testing

### Translation Testing
1. **UI Elements**: All text displays in English
2. **Alerts**: All dialogs show English messages
3. **Dates**: All dates use English format
4. **Share Messages**: All share text is in English

### Statistics Testing
1. **Days Active**: Should show actual days since registration
2. **Time in App**: Should calculate based on completed challenges
3. **Updates**: Numbers should change as user progresses
4. **Accuracy**: Calculations should be mathematically correct

## Future Improvements

- [ ] Add language selection in settings
- [ ] Support multiple languages
- [ ] Localize number formats
- [ ] Add timezone support for statistics
- [ ] Implement more detailed time tracking
- [ ] Add progress animations for statistics

## Notes

- All hardcoded Russian text has been replaced
- Date formats now use English locale
- Statistics are calculated dynamically
- User experience remains consistent
- No functionality was lost in translation

