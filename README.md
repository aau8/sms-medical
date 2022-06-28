# Сборка Gulp для верстки
Данная сборка позволит писать код гораздо быстрее, меньше тратить время на рутинные задачи, такие как минификация, оптимизация картинок, шрифтов и пр, а также, она поможет улучшить файловую структуру за счет поддержки SASS и модульного JS

## Функционал сборки

### Общие
  * Функционал Gulp (`gulp`)
  * Создание локального сервера и его автоматическое обновление, при изменении содержимого файлов (`browser-sync`, `del`)
  * Уведомление об ошибках (`gulp-plumber`, `gulp-notify`)

### HTML
  * Возможность использования шаблонов (`gulp-file-include`)
  * Решение проблемы кеширования файлов (`gulp-version-number`)
  * Автоматическая замена тегов img на picture для использования webp (`gulp-webp-html-nosvg`)

### CSS
  * Препроцессор SASS (`gulp-sass`, `sass`)
  * Минимизация CSS (`gulp-clean-css`, `gulp-rename`)
  * Автопрефиксы для CSS (`gulp-autoprefixer`)
  * Объединение одинаковых медиа-запросов в один (`gulp-group-css-media-queries`)
  * Возможность использования webp изображений указанных в теге background-img (`gulp-webpcss`)

### JavaScript
  * Синтаксис ES6 для JavaScript (`webpack-stream`, `webpack`)

### Медиа
  * Оптимизация и сжатие изображений (`gulp-imagemin`)
  * Конвертация в webp (`gulp-webp`)


## Что еще можно сделать
  * Добавить отдельную задачу для компиляции изображений
  * Общие плагины объединить в один файл
  * Создание svg-спрайта