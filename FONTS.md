# Настройка шрифтов в приложении

## Обзор

В приложении "2Days Sport Challenge" используется кастомный шрифт **DMMono-Italic.ttf** для всех текстовых элементов.

## Структура шрифтов

### Файл шрифта
- **Путь**: `src/assets/fonts/DMMono-Italic.ttf`
- **Тип**: TrueType Font (TTF)
- **Стиль**: Italic (курсив)

### Конфигурация

#### Константы (`src/constants/index.ts`)
```typescript
export const FONTS = {
  regular: 'DMMono-Italic',
  medium: 'DMMono-Italic',
  bold: 'DMMono-Italic',
  italic: 'DMMono-Italic',
};
```

#### Утилиты (`src/utils/fontUtils.ts`)
```typescript
export const textStyles = {
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    fontWeight: '400',
  },
  small: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    fontWeight: '400',
  },
  button: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    fontWeight: '400',
  },
};
```

## Использование

### Импорт утилит
```typescript
import { textStyles } from '../utils/fontUtils';
```

### Применение стилей
```typescript
const styles = StyleSheet.create({
  title: {
    ...textStyles.title,
    color: '#000000',
  },
  body: {
    ...textStyles.body,
    color: '#666666',
  },
});
```

### Прямое использование
```typescript
import { getFontStyle } from '../utils/fontUtils';

const styles = StyleSheet.create({
  customText: {
    ...getFontStyle('bold'),
    fontSize: 18,
    color: '#FF0000',
  },
});
```

## Типы текстов

### Заголовки
- **title**: 28px, жирный - для главных заголовков
- **subtitle**: 20px, средний - для подзаголовков

### Основной текст
- **body**: 16px, обычный - для основного контента
- **caption**: 14px, обычный - для подписей и описаний
- **small**: 12px, обычный - для мелкого текста

### Интерактивные элементы
- **button**: 16px, жирный - для кнопок
- **input**: 16px, обычный - для полей ввода

## Применение в компонентах

### Экраны
- **HomeScreen**: Заголовки, описания, кнопки
- **ProfileRegistrationScreen**: Формы, кнопки
- **OnboardingScreen**: Заголовки, описания
- **SafetyWarningScreen**: Предупреждения
- **ChallengesScreen**: Списки, описания
- **BadgesScreen**: Награды, описания
- **SettingsScreen**: Настройки, формы
- **StatsScreen**: Статистика, данные

### Компоненты
- **BottomTabNavigator**: Навигация
- **StatsCard**: Карточки статистики
- **NewBadgeModal**: Модальные окна
- **LoadingSpinner**: Загрузка
- **ProfilePictureSelector**: Выбор фото

## Преимущества

### Консистентность
- Единый шрифт во всем приложении
- Предустановленные стили для разных типов текста
- Легкое изменение стилей через константы

### Производительность
- Кэширование шрифта системой
- Оптимизированная загрузка
- Минимальное влияние на размер приложения

### Поддержка
- Легкое изменение шрифта через константы
- Централизованное управление стилями
- Простое добавление новых стилей

## Кастомизация

### Изменение шрифта
Чтобы изменить шрифт во всем приложении, обновите константы:

```typescript
export const FONTS = {
  regular: 'YourNewFont-Regular',
  medium: 'YourNewFont-Medium',
  bold: 'YourNewFont-Bold',
  italic: 'YourNewFont-Italic',
};
```

### Добавление новых стилей
Добавьте новые стили в `textStyles`:

```typescript
export const textStyles = {
  // ... существующие стили
  largeTitle: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    fontWeight: 'bold',
  },
  code: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
  },
};
```

### Изменение размеров
Обновите размеры в `textStyles`:

```typescript
export const textStyles = {
  title: {
    fontFamily: FONTS.bold,
    fontSize: 24, // Изменено с 28
    fontWeight: 'bold',
  },
  // ... другие стили
};
```

## Тестирование

### Проверка отображения
1. Запустите приложение
2. Проверьте все экраны на корректность отображения шрифта
3. Убедитесь, что текст читается и выглядит хорошо

### Проверка производительности
1. Измерьте время загрузки приложения
2. Проверьте плавность анимаций
3. Убедитесь в отсутствии задержек при рендеринге

## Совместимость

### Платформы
- **iOS**: Полная поддержка TTF шрифтов
- **Android**: Полная поддержка TTF шрифтов

### Версии React Native
- **0.80.0**: Протестировано и работает
- **Более новые версии**: Должны работать без изменений

## Устранение неполадок

### Шрифт не отображается
1. Проверьте путь к файлу шрифта
2. Убедитесь, что файл существует
3. Проверьте правильность имени шрифта

### Неправильное отображение
1. Проверьте корректность `fontFamily`
2. Убедитесь в правильности `fontWeight`
3. Проверьте совместимость с платформой

### Проблемы с производительностью
1. Убедитесь, что шрифт кэшируется
2. Проверьте размер файла шрифта
3. Рассмотрите использование системных шрифтов для тестирования

## Будущие улучшения

- [ ] Поддержка динамических шрифтов
- [ ] Адаптивные размеры для разных экранов
- [ ] Поддержка темной темы
- [ ] Локализация шрифтов
- [ ] Оптимизация загрузки шрифтов

