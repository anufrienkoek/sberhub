# sberhub

Репозиторий со статическими страницами виртуального тура Pano2VR (2 варианта: `hub` и `iot`) и конфигами панорам (`pano.xml`).

## Быстрый просмотр

- HUB: `https://anufrienkoek.github.io/sberhub/hub/`
- IOT: `https://anufrienkoek.github.io/sberhub/iot/`

GitHub Pages деплоит содержимое репозитория автоматически (workflow: `sberhub/.github/workflows/static.yml`).

## Экскурсия по проекту

- `hub/` — тур "HUB"
- `iot/` — тур "IOT"
- `*/index.html` — HTML-оболочка, UI (кнопка звука, меню, перезапуск)
- `*/pano.xml` — конфиг панорам и ссылки на тайлы (`leveltileurl`)
- `*/pano2vr_player.js`, `*/skin.js` — рантайм/скин Pano2VR
- `*/images/` — локальные ассеты UI (иконки/прицел и т.д.)

## Ассеты (тайлы, лого, звук)

Тайлы панорам (`tiles/.../tile_*.jpg`) и медиа (логотип/звук) отдаются из Object Storage (S3), чтобы:

- не упираться в CORS при загрузке изображений из `pano.xml`
- держать тяжёлые файлы вне GitHub Pages

Текущие пути:

- Тайлы:
  - `https://s3.twcstorage.ru/<bucket>/sber/hub/tiles/...`
  - `https://s3.twcstorage.ru/<bucket>/sber/iot/tiles/...`
- Фоновый звук: `https://s3.twcstorage.ru/<bucket>/sber/media/sound.mp3`
- Логотип: `https://s3.twcstorage.ru/<bucket>/sber/media/logoadt.svg`

Важно: бакет и объекты должны быть публично читаемыми (`GET`/`HEAD` без авторизации), иначе браузер будет получать `403 AccessDenied`.

## Настройки S3 (Timeweb)

1) Включить публичный доступ (anonymous/public read) хотя бы для префикса `sber/`.

2) Включить CORS на бакете (минимальный вариант):

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length", "Content-Range"],
    "MaxAgeSeconds": 86400
  }
]
```

Проверка (должно быть `200`, а в заголовках `Access-Control-Allow-Origin`):

```bash
curl -I "https://s3.twcstorage.ru/<bucket>/sber/hub/tiles/node2/cf_0/l_0/c_0/tile_0.jpg"
```

## Оптимизация загрузки

Чтобы тур не пытался скачивать «целый уровень тайлов пачкой», в `hub/pano.xml` и `iot/pano.xml` отключён `preload="1"` у уровня `480px`.
Остаётся подгрузка тайлов по необходимости (в пределах текущего вида/узла).

## Как обновлять тур

1) Экспортировать тур из Pano2VR.
2) Заменить файлы в соответствующей папке (`hub/` или `iot/`).
3) Проверить, что в `pano.xml` корректный `leveltileurl` (указывает на ваш S3-префикс).
4) Загрузить в S3 соответствующие папки `sber/<tour>/tiles/` и файлы из `sber/media/`.
5) Коммит + push — GitHub Pages обновится автоматически.

## Безопасность

Никогда не публикуйте ключи доступа S3/Swift. Если ключи случайно утекли, их нужно отозвать и выпустить новые.
