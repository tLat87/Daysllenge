# Функциональность выбора фото профиля

## Обзор

Добавлена возможность выбора фотографии профиля из галереи устройства на экране регистрации профиля.

## Установленные зависимости

### react-native-image-picker
```bash
npm install react-native-image-picker
```

## Изменения в коде

### ProfilePictureSelector.tsx

#### Импорты
```typescript
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { Image } from 'react-native';
```

#### Функция выбора изображения
```typescript
const openImagePicker = () => {
  const options = {
    mediaType: 'photo' as MediaType,
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
  };

  launchImageLibrary(options, (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      return;
    }

    if (response.assets && response.assets[0]) {
      const imageUri = response.assets[0].uri;
      if (imageUri) {
        onImageSelect(imageUri);
      }
    }
  });
};
```

#### Рендеринг изображения
```typescript
{currentImage ? (
  <View style={styles.imageContainer}>
    <Image 
      source={{ uri: currentImage }} 
      style={styles.profileImage}
      resizeMode="cover"
    />
  </View>
) : (
  <View style={styles.cameraContainer}>
    <Text style={styles.cameraIcon}>📷</Text>
  </View>
)}
```

#### Стили
```typescript
imageContainer: {
  width: 80,
  height: 80,
  borderRadius: 12,
  backgroundColor: '#F0F0F0',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
},
profileImage: {
  width: '100%',
  height: '100%',
  borderRadius: 12,
},
```

## Настройка разрешений

### iOS (Info.plist)
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to select profile pictures.</string>
```

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Функциональность

### Выбор изображения
1. **Нажатие на область фото** открывает диалог выбора
2. **"Выбрать из галереи"** - открывает галерею устройства
3. **"Удалить фото"** - удаляет текущее изображение
4. **"Отмена"** - закрывает диалог без изменений

### Обработка изображения
- **Максимальный размер**: 2000x2000px
- **Качество**: 0.8 (80%)
- **Формат**: JPEG/PNG
- **Режим отображения**: cover (покрытие с обрезкой)

### Состояния компонента
- **Без фото**: Показывает иконку камеры 📷
- **С фото**: Показывает выбранное изображение
- **Ошибка**: Возвращается к состоянию без фото

## Пользовательский интерфейс

### Диалог выбора
```
┌─────────────────────────────┐
│     Выберите фото профиля    │
├─────────────────────────────┤
│  Выберите изображение для   │
│     вашего профиля          │
├─────────────────────────────┤
│  ✗ Отмена                   │
│  📷 Выбрать из галереи      │
│  🗑️ Удалить фото            │
└─────────────────────────────┘
```

### Отображение фото
- **Размер**: 80x80px
- **Форма**: Скругленные углы (12px)
- **Обрезка**: Автоматическая под размер контейнера
- **Фон**: Серый (#F0F0F0) при отсутствии фото

## Технические детали

### Опции image picker
```typescript
const options = {
  mediaType: 'photo',           // Только фотографии
  includeBase64: false,         // Не включать base64
  maxHeight: 2000,             // Максимальная высота
  maxWidth: 2000,              // Максимальная ширина
  quality: 0.8,                // Качество сжатия
};
```

### Обработка ответа
```typescript
launchImageLibrary(options, (response) => {
  // Проверка отмены или ошибки
  if (response.didCancel || response.errorMessage) {
    return;
  }

  // Получение URI изображения
  if (response.assets && response.assets[0]) {
    const imageUri = response.assets[0].uri;
    if (imageUri) {
      onImageSelect(imageUri);
    }
  }
});
```

## Совместимость

### Платформы
- **iOS**: Полная поддержка
- **Android**: Полная поддержка

### Версии React Native
- **0.80.0**: Протестировано
- **Более новые**: Должны работать

## Устранение неполадок

### Изображение не отображается
1. Проверьте правильность URI
2. Убедитесь в корректности стилей
3. Проверьте права доступа

### Ошибки разрешений
1. **iOS**: Проверьте Info.plist
2. **Android**: Проверьте AndroidManifest.xml
3. Перезапустите приложение после изменений

### Проблемы с производительностью
1. Уменьшите качество изображения
2. Ограничьте максимальный размер
3. Используйте кэширование

## Безопасность

### Права доступа
- Запрашиваются только при необходимости
- Пользователь может отказать в доступе
- Приложение работает без фото профиля

### Обработка данных
- Изображения не сохраняются локально
- URI передается только в компонент
- Нет отправки на сервер

## Будущие улучшения

- [ ] Поддержка камеры для съемки фото
- [ ] Обрезка изображений
- [ ] Фильтры и эффекты
- [ ] Сжатие изображений
- [ ] Кэширование выбранных фото
- [ ] Поддержка аватаров по умолчанию

