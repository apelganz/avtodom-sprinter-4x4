# Картинки для страницы /story

Положите готовые файлы в `assets/story/` с именем из колонки «Файл» — страница подхватит их сама. Пока файла нет, на его месте серый плейсхолдер с ID, пропорциями и описанием.

## Общие правила (style_notes)

One consistent photoreal style across the whole page: premium editorial automotive / architectural photography, calm and restrained, no people, no logos, no badges, no license plates, no text or watermarks in the image. The vehicle is always the same: a Mercedes-Benz Sprinter 4x4 medium wheelbase L2 (about 5.9 m long, NOT the long L3 body) high roof panel van converted into an expedition camper, GLOSSY dark grey body — a deep graphite / gunmetal grey (around #3C4045) that clearly reads as GREY, NOT black, solid colour without metallic flake, high-gloss clear coat with crisp clean reflections of the sky and lights, the exact same grey in every image, black wheels, all-terrain tyres, raised ground clearance, skid plates under engine and tanks, reinforced rear bumper with spare wheel, rear ladder, full-length low roof rack with solar panels, a 3.5–4 m awning on the right side above the sliding door with LED strip, no plastic add-ons. Palette matches the site: near-black backgrounds (#08080A), neutral greys, warm white light; the only saturated colour on the site is neon green #18FF64 — do NOT put green accents into images, keep them neutral so the UI accent stays unique. Interior: rounded forms, no sharp corners, light matte surfaces, metal, warm linear light — like a yacht or business jet. Mood: BLUE HOUR just after sunset in open nature — luminous deep-blue sky, readable landscape, NOT pitch-black night and NOT inside a dense forest; the van is lit like a premium car commercial with soft artificial key and rim lights plus its own warm interior and awning LED glow. Images must be bright enough that the grey paint and its reflections read clearly. One lighting setup per scene: Scene 1 — blue hour on an open high mountain plateau, soft key light from camera left + clean rim lights; Scene 2 — blue hour on the open shore of a calm mountain lake (no dense forest), warm glow from the windows and awning LED reflected in the water; Scene 3 — evening, clean modern workshop / studio, soft artificial top and rim lights, mid-grey not black. Spread 1 — interior at night with warm linear lights, dark landscape in the windows; Spread 2 — workshop at night under artificial lights. Van images are full-frame photos of the van in its setting (no transparency); within a scene the setting and light stay the same. Van state images share one 16:9 canvas with the van in the same place where possible, so states cross-fade smoothly. (centred, wheels on a baseline at 82% of canvas height, van length ≈ 78% of canvas width), so states cross-fade without jumping. Pinned scenes sit inside a rounded dark panel almost the full screen (12 px from the edges). Spread photos sit in square bento tiles with rounded corners (1:1). Close-up states are the same canvas, framed as a zoom into the same view (the page animates the zoom first, then cross-fades). 

## Список

| ID | Файл | Где на странице | Финал (x2) | Превью | Пропорции | Фон |
|---|---|---|---|---|---|---|
| `scene1-turn-010` … `scene1-turn-350` | `scene1-turn-010.webp`, `030`, `050` … `350.webp` (18 файлов, шаг 20°) | Сцена 1 — машина вращается при скролле | 3200×1800 | 1600×900 | 16:9 | full |
| `scene1-rv-awning` | `scene1-rv-awning.webp` | Сцена 1, шаг 3 — поверх кадра 090°: тот же борт с выдвинутой маркизой, плашка «Маркиза 3,5–4 м» | 3200×1800 | 1600×900 | 16:9 | full |
| `spread1-photo-main` | `spread1-photo-main.webp` | Разворот 1 (бенто) — плитка 2×2 слева: салон | 1600×1600 | 1024×1024 | 1:1 | full |
| `spread1-photo-detail` | `spread1-photo-detail.webp` | Разворот 1 (бенто) — плитка 1×1: макро материалов | 800×800 | 768×768 | 1:1 | full |
| `spread1-photo-kitchen` | `spread1-photo-kitchen.webp` | Разворот 1 (бенто) — плитка 2×2 по центру: кухня | 1600×1600 | 1024×1024 | 1:1 | full |
| `scene2-rv-roof` | `scene2-rv-roof.webp` | Сцена 2, шаг 1 — вид сверху на крышу с панелями, «Неделя без единой розетки» | 3200×1800 | 1600×900 | 16:9 | full |
| `scene2-rv-xray-water` | `scene2-rv-xray-water.webp` | Сцена 2, шаг 2 — «рентген» борта: баки и бойлер, плашка «Вода» | 3200×1800 | 1600×900 | 16:9 | full |
| `scene2-rv-xray-climate` | `scene2-rv-xray-climate.webp` | Сцена 2, шаг 3 — «рентген»: отопитель, кондиционер, люки, плашки климата | 3200×1800 | 1600×900 | 16:9 | full |
| `scene2-rv-cabin` | `scene2-rv-cabin.webp` | Сцена 2, шаг 4 — приближение к кабине, видно iPad на торпеде | 3200×1800 | 1600×900 | 16:9 | full |
| `scene2-detail-panel` | `scene2-detail-panel.webp` | Сцена 2, шаг 4 — картинка внутри плашки: интерфейс на iPad | 1200×800 | 900×600 | 3:2 | full |
| `spread2-photo-main` | `spread2-photo-main.webp` | Разворот 2 (бенто) — плитка 2×2 справа: фактура 3D-печати | 1600×1600 | 1024×1024 | 1:1 | full |
| `spread2-photo-detail` | `spread2-photo-detail.webp` | Разворот 2 (бенто) — плитка 1×1: макро стыка шип-паз | 800×800 | 768×768 | 1:1 | full |
| `spread2-photo-module` | `spread2-photo-module.webp` | Разворот 2 (бенто) — плитка 2×2 слева: модуль в разборе | 1600×1600 | 1024×1024 | 1:1 | full |
| `scene3-rv-xray` | `scene3-rv-xray.webp` | Сцена 3, шаг 1 — «рентген» борта с контурами модулей, «Не один автодом, а конструктор» | 3200×1800 | 1600×900 | 16:9 | full |
| `scene3-rv-exploded` | `scene3-rv-exploded.webp` | Сцена 3, шаг 2 — модули «вынуты» и парят над машиной | 3200×1800 | 1600×900 | 16:9 | full |
| `scene3-layout-travel` | `scene3-layout-travel.webp` | Сцена 3, шаг 3 — компоновка «Двое в долгом путешествии» | 3200×1800 | 1600×900 | 16:9 | full |
| `scene3-layout-weekend` | `scene3-layout-weekend.webp` | Сцена 3, шаг 4 — компоновка «Один на выходные» | 3200×1800 | 1600×900 | 16:9 | full |
| `scene3-layout-work` | `scene3-layout-work.webp` | Сцена 3, шаг 5 — компоновка «Работа из фургона» | 3200×1800 | 1600×900 | 16:9 | full |

## Как сделать серию вращения scene1-turn-*

Генератор картинок не удержит одну и ту же машину на 18 ракурсах. Надёжнее так:

1. Сгенерировать героя-кадр (ракурс 3/4 спереди) и из него — видео «360° orbit turntable» (image-to-video), машина неподвижна, камера облетает её по кругу ровно один раз. Либо отрендерить облёт из 3D-модели.
2. Нарезать видео на кадры через 20°, начиная с 10° (10°, 30° … 350° — 18 штук), и убрать фон (прозрачный PNG/WebP).
3. Назвать кадры по углу: `scene1-turn-010.webp`, `030`, `050` … `350`. Камера идёт по часовой стрелке, если смотреть сверху: спереди → правый борт (90°) → сзади (180°) → левый борт (270°).
4. Положить в `assets/story/`. Страница сама подгрузит кадры; если какого-то нет, возьмёт ближайший готовый.

Нарезка видео (ffmpeg), если ролик длится D секунд и начинается спереди (берём каждый второй из 36 кадров — 10°, 30° …):

```bash
mkdir -p frames && ffmpeg -i turntable.mp4 -vf "fps=36/D,select='mod(n\,2)',scale=3200:1800:force_original_aspect_ratio=decrease,pad=3200:1800:(ow-iw)/2:(oh-ih)/2:color=0x00000000" -vsync 0 -frames:v 18 frames/%02d.png
```

Прозрачный фон — любым удалением фона (Photoshop, remove.bg, rembg). Потом конвертация и имена:

```bash
i=0; for f in frames/*.png; do cwebp -q 90 -alpha_q 100 "$f" -o assets/story/scene1-turn-$(printf %03d $((10+i*20))).webp; i=$((i+1)); done
```

Промпт кадра (подставить угол):

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame N of 18 of a 360° turntable: camera orbiting at {ANGLE}° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

## Промпты

### `scene1-rv-awning`

Сцена 1, шаг 3 — поверх кадра 090°: тот же борт с выдвинутой маркизой, плашка «Маркиза 3,5–4 м» · 3200×1800 · 16:9 · фон: full

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. EXACTLY the same camera, scale, position and light as turntable frame scene1-turn-090 (pure right side profile), but with the 3.5–4 m awning extended above the open sliding door, warm LED strip glowing, a folding table and two folding chairs under it. It cross-fades over frame 090, so the van body must align pixel-perfectly. 
```

### `spread1-photo-main`

Разворот 1 (бенто) — плитка 2×2 слева: салон · 1600×1600 · 1:1 · фон: full

```
Interior of the camper van at night lit by warm linear LED strips and soft indirect artificial light, view from the cab towards the rear: grey sofa along the left wall, kitchen with rounded matte fronts along the right wall, curved cabinet doors, smooth wall-to-ceiling transition, rounded windows, warm linear light strip in the ceiling, light matte surfaces and brushed metal. Dark night landscape with a faint mountain silhouette visible through the windows. Wide-angle architectural interior photography, eye level. Square 1:1 composition for a bento tile with rounded corners; keep the subject away from the corners.
```

### `spread1-photo-detail`

Разворот 1 (бенто) — плитка 1×1: макро материалов · 800×800 · 1:1 · фон: full

```
Macro detail of camper interior materials: matte light furniture front with a large radius corner, brushed aluminium edge, quartz worktop, warm artificial LED light grazing across the surfaces at night. Square 1:1 macro for a small bento tile, one rounded corner as the hero of the frame. Shallow depth of field, minimalist product photography, neutral warm whites and greys.
```

### `spread1-photo-kitchen`

Разворот 1 (бенто) — плитка 2×2 по центру: кухня · 1600×1600 · 1:1 · фон: full

```
Camper kitchen block along the right wall next to the sliding door: two-burner gas hob under a glass lid, compact sink, rounded matte fronts, metal details, the sofa visible opposite. Night: warm under-cabinet LED and ceiling linear light, the open sliding door shows a dark lake shore lit by the awning LED. Square 1:1 three-quarter interior view for a bento tile, calm editorial style.
```

### `scene2-rv-roof`

Сцена 2, шаг 1 — вид сверху на крышу с панелями, «Неделя без единой розетки» · 3200×1800 · 16:9 · фон: full

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. High three-quarter view from above the front-left, showing the whole roof: full-length roof rack covered with solar panels, roof vents. Blue hour by an open mountain lake: luminous deep-blue sky reflected in the glossy paint, warm glow from the interior windows and the awning LED strip. Same canvas placement (centred, ≈ 78% width). Full-frame image in the scene's setting.
```

### `scene2-rv-xray-water`

Сцена 2, шаг 2 — «рентген» борта: баки и бойлер, плашка «Вода» · 3200×1800 · 16:9 · фон: full

```
Technical x-ray side view of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: the body shell rendered semi-transparent / ghosted, inside visible a fresh water tank and a boiler, an insulated grey water tank under the floor, shower area at the rear, kitchen sink; water lines shown as clean tubes. Night tones: deep blue ambience, warm interior glow. Exactly the same position and scale as the side profile overview states. Full-frame image in the scene's setting. Leave space above the van for labels.
```

### `scene2-rv-xray-climate`

Сцена 2, шаг 3 — «рентген»: отопитель, кондиционер, люки, плашки климата · 3200×1800 · 16:9 · фон: full

```
Technical x-ray side view of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people, ghosted body shell: inside visible a compact rooftop monoblock air conditioner, an autonomous diesel air heater under the floor connected to the vehicle fuel tank, a heater with boiler, roof vents with fans in the living area and in the bathroom, a gas bottle in a separate vented compartment. Night tones: deep blue ambience, warm artificial highlights. Same position/scale as the other side states. Full-frame image in the scene's setting.
```

### `scene2-rv-cabin`

Сцена 2, шаг 4 — приближение к кабине, видно iPad на торпеде · 3200×1800 · 16:9 · фон: full

```
Close-up of the cab of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people seen through the open driver door / side window at night: a large 13-inch tablet mounted on the centre of the dashboard next to the driver, screen glowing softly. Framed as a 2× zoom of the side view centred on the cab. Leave the right 35% empty for text.
```

### `scene2-detail-panel`

Сцена 2, шаг 4 — картинка внутри плашки: интерфейс на iPad · 1200×800 · 3:2 · фон: full

```
Front-on close-up of a 13-inch tablet screen showing a dark camper control dashboard UI: battery charge, water levels, heating, lights as clean tiles on a near-black background, neutral white typography and grey widgets, no brand names, no readable text required. Night reflections on the glass. Product photography.
```

### `spread2-photo-main`

Разворот 2 (бенто) — плитка 2×2 справа: фактура 3D-печати · 1600×1600 · 1:1 · фон: full

```
Large 3D-printed interior panel of a camper van, matte ASA/PETG surface, visible print layers turned into an aesthetic texture of ribs and patterns, rounded edge joining an aluminium structural profile. Workshop at night under clean artificial lights (soft overhead panels + a grazing side light that brings out the layer lines), close editorial product photography, neutral greys and warm white. Square 1:1 composition for a bento tile.
```

### `spread2-photo-detail`

Разворот 2 (бенто) — плитка 1×1: макро стыка шип-паз · 800×800 · 1:1 · фон: full

```
Macro of a hidden tongue-and-groove joint between two 3D-printed panels fixed with a single screw to an aluminium profile, precise fit, no glue, square 1:1 macro for a small bento tile, artificial grazing workshop light at night, shallow depth of field, neutral palette.
```

### `spread2-photo-module`

Разворот 2 (бенто) — плитка 2×2 слева: модуль в разборе · 1600×1600 · 1:1 · фон: full

```
Exploded flat-lay of a camper kitchen module on a light workshop table: aluminium frame, laser-cut panels, 3D-printed connectors and brackets, fronts and a worktop, laid out neatly, top-down view, soft artificial overhead workshop light, square 1:1 catalogue-like product photography for a bento tile.
```

### `scene3-rv-xray`

Сцена 3, шаг 1 — «рентген» борта с контурами модулей, «Не один автодом, а конструктор» · 3200×1800 · 16:9 · фон: full

```
Side profile of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people rendered as a clean technical x-ray: body shell ghosted light grey, interior modules (bed, kitchen, wardrobe, bathroom capsule, seats) shown as simple rounded solid blocks. Night, dark studio with clean artificial top and rim lights. Exactly the same position/scale as the side overview states. Full-frame image in the scene's setting.
```

### `scene3-rv-exploded`

Сцена 3, шаг 2 — модули «вынуты» и парят над машиной · 3200×1800 · 16:9 · фон: full

```
Same side x-ray view of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people, but the interior modules (bed, kitchen block, wardrobe, bathroom capsule, seats) are lifted out and float in a neat row above the roof, aligned to a grid, as in an exploded product diagram. Dark studio, artificial top and rim lights, light grey modules. Same van position and scale. Full-frame image in the scene's setting.
```

### `scene3-layout-travel`

Сцена 3, шаг 3 — компоновка «Двое в долгом путешествии» · 3200×1800 · 16:9 · фон: full

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people with a full interior layout: shower and toilet capsule at the rear, large water tank, kitchen, sofa-bed, storage for equipment. Modules as clean light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```

### `scene3-layout-weekend`

Сцена 3, шаг 4 — компоновка «Один на выходные» · 3200×1800 · 16:9 · фон: full

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: bathroom capsule and wardrobe removed, replaced by open space for outdoor gear (bike, boards), plus a short kitchen block. Modules as light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```

### `scene3-layout-work`

Сцена 3, шаг 5 — компоновка «Работа из фургона» · 3200×1800 · 16:9 · фон: full

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: two seats facing a table instead of part of the cabinets, the bed placed across the rear. Modules as light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```
