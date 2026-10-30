# Task for an image-generation AI: fill the /story page with images

You are generating images for an experimental landing page of a camper-van concept (`story.html` in this folder). The page already exists and is finished. Your ONLY job is to create image files and put them into `assets/story/` with the exact file names below. The page picks them up automatically: wherever a file is missing it shows a grey placeholder with the image ID.

## Rules

1. **Do not edit** `story.html`, `story.css`, `story.js`, `index.html` or anything else. Only add files to `assets/story/`. Do not commit or push.
2. **File names must match exactly**: lowercase, hyphens, `.webp` extension, e.g. `assets/story/scene2-rv-roof.webp`.
3. **This is a PREVIEW pass.** Generate at the PREVIEW size given for each image (e.g. 1600×900 instead of 3200×1800). Keep the aspect ratio exact. Final high-res versions come later with the same names.
4. **Transparent images** (`background: transparent`): the van must be cut out with real alpha — no ground, no sky, no floor, only a soft contact shadow under the wheels. If your generator cannot output alpha, generate on flat #FF00FF and remove the background (e.g. `rembg`, Photoshop, remove.bg), then save as WebP with alpha.
5. **Format**: WebP, quality ~85. If you only can produce PNG/JPG, convert, e.g. `cwebp -q 85 -alpha_q 100 in.png -o out.webp` (install: `brew install webp`) or Python Pillow: `Image.open(p).save(out, 'WEBP', quality=85)`.
6. **No text, logos, badges, licence plates or people** in any image.
7. **The car is ALWAYS the same vehicle**: Mercedes-Benz Sprinter 4x4, medium wheelbase L2 (≈5.9 m, NOT the long L3), high roof, expedition camper, **glossy dark grey** paint (deep graphite grey ≈ #3C4045 — clearly GREY, NOT black; GLOSSY clear coat with crisp reflections, NOT matte; no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, reinforced rear bumper with spare wheel, rear ladder, full-length low roof rack with solar panels, 3.5–4 m awning on the RIGHT side above the sliding door. Generate the first van image, approve it, and then use it as a **reference image** (image-to-image / character reference) for every other van image so the vehicle stays identical.
8. **Same placement for all van states**: 16:9 canvas, van centred, wheels on a horizontal baseline at 82% of the canvas height, van length ≈ 78% of canvas width in the side views. States cross-fade on scroll, so the van must not jump between images of the same scene.
9. Photos must stay **neutral in colour**: the site's accent is neon green #18FF64 — do not add green to images.

## Order of work

**Pass A — enough to see the page working (do this first):**

- `scene1-turn-030.webp`
- `scene1-turn-050.webp`
- `scene1-turn-090.webp`
- `scene1-turn-150.webp`
- `scene1-rv-awning.webp`
- `spread1-photo-main.webp`
- `spread1-photo-detail.webp`
- `spread1-photo-kitchen.webp`
- `scene2-rv-roof.webp`
- `scene2-rv-xray-water.webp`
- `scene2-rv-xray-climate.webp`
- `scene2-rv-cabin.webp`
- `scene2-detail-panel.webp`
- `spread2-photo-main.webp`
- `spread2-photo-detail.webp`
- `spread2-photo-module.webp`
- `scene3-rv-xray.webp`
- `scene3-rv-exploded.webp`
- `scene3-layout-travel.webp`
- `scene3-layout-weekend.webp`
- `scene3-layout-work.webp`

With only these 4 turntable frames the page already rotates the van (it shows the nearest existing frame). Generate scene backgrounds `sceneN-bg` first in each scene and match the van lighting to them.

**Pass B — full rotation:** the remaining turntable frames (18 in total, every 20°):

- `scene1-turn-010.webp`, `scene1-turn-070.webp`, `scene1-turn-110.webp`, `scene1-turn-130.webp`, `scene1-turn-170.webp`, `scene1-turn-190.webp`, `scene1-turn-210.webp`, `scene1-turn-230.webp`, `scene1-turn-250.webp`, `scene1-turn-270.webp`, `scene1-turn-290.webp`, `scene1-turn-310.webp`, `scene1-turn-330.webp`, `scene1-turn-350.webp`

**Pass C — later, final quality:** all images again at the final size, same names. The most reliable way to get a consistent 360° set is one orbit video (image-to-video from the hero frame) cut into frames — see `story-assets.md`, section «Как сделать серию вращения».

## Turntable angles (scene 1)

Angle = where the CAMERA stands, orbiting the parked van at constant distance and height (headlight height): **0° = in front of the van, 90° = on the van's RIGHT side (sliding door + awning side), 180° = behind, 270° = left side.** The van never moves; the light is the same blue-hour light in every frame (soft key light from camera left + clean rim lights); awning retracted, doors closed. `scene1-rv-awning` is exactly frame 090 but with the awning extended and table + chairs underneath.

## Check your result

1. Run the local server from the project root: `python3 dev/server.py` and open http://localhost:8000/story.html
2. Scroll through: in scene 1 the van turns and the angle is shown at the bottom left; no grey placeholders should remain for the files you generated.
3. Report back the list of files you created, their sizes, and anything you could not generate.

## Global style (applies to every image)

One consistent photoreal style across the whole page: premium editorial automotive / architectural photography, calm and restrained, no people, no logos, no badges, no license plates, no text or watermarks in the image. The vehicle is always the same: a Mercedes-Benz Sprinter 4x4 medium wheelbase L2 (about 5.9 m long, NOT the long L3 body) high roof panel van converted into an expedition camper, GLOSSY dark grey body — a deep graphite / gunmetal grey (around #3C4045) that clearly reads as GREY, NOT black, solid colour without metallic flake, high-gloss clear coat with crisp clean reflections of the sky and lights, the exact same grey in every image, black wheels, all-terrain tyres, raised ground clearance, skid plates under engine and tanks, reinforced rear bumper with spare wheel, rear ladder, full-length low roof rack with solar panels, a 3.5–4 m awning on the right side above the sliding door with LED strip, no plastic add-ons. Palette matches the site: near-black backgrounds (#08080A), neutral greys, warm white light; the only saturated colour on the site is neon green #18FF64 — do NOT put green accents into images, keep them neutral so the UI accent stays unique. Interior: rounded forms, no sharp corners, light matte surfaces, metal, warm linear light — like a yacht or business jet. Mood: BLUE HOUR just after sunset in open nature — luminous deep-blue sky, readable landscape, NOT pitch-black night and NOT inside a dense forest; the van is lit like a premium car commercial with soft artificial key and rim lights plus its own warm interior and awning LED glow. Images must be bright enough that the grey paint and its reflections read clearly. One lighting setup per scene: Scene 1 — blue hour on an open high mountain plateau, soft key light from camera left + clean rim lights; Scene 2 — blue hour on the open shore of a calm mountain lake (no dense forest), warm glow from the windows and awning LED reflected in the water; Scene 3 — evening, clean modern workshop / studio, soft artificial top and rim lights, mid-grey not black. Spread 1 — interior at night with warm linear lights, dark landscape in the windows; Spread 2 — workshop at night under artificial lights. Van images are full-frame photos of the van in its setting (no transparency); within a scene the setting and light stay the same. Van state images share one 16:9 canvas with the van in the same place where possible, so states cross-fade smoothly. (centred, wheels on a baseline at 82% of canvas height, van length ≈ 78% of canvas width), so states cross-fade without jumping. Pinned scenes sit inside a rounded dark panel almost the full screen (12 px from the edges). Spread photos sit in square bento tiles with rounded corners (1:1). Close-up states are the same canvas, framed as a zoom into the same view (the page animates the zoom first, then cross-fades). 

## Images

### `scene1-turn-030.webp`

- Where on the page: Сцена 1 — кадр вращения 30° (серия из 18 кадров через 20°, сменяются при скролле)
- Save as: `assets/story/scene1-turn-030.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame 2 of 18 of a 360° turntable: camera orbiting at 30° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

### `scene1-turn-050.webp`

- Where on the page: Сцена 1 — кадр вращения 50° (серия из 18 кадров через 20°, сменяются при скролле)
- Save as: `assets/story/scene1-turn-050.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame 3 of 18 of a 360° turntable: camera orbiting at 50° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

### `scene1-turn-090.webp`

- Where on the page: Сцена 1 — кадр вращения 90° (серия из 18 кадров через 20°, сменяются при скролле)
- Save as: `assets/story/scene1-turn-090.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame 5 of 18 of a 360° turntable: camera orbiting at 90° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

### `scene1-turn-150.webp`

- Where on the page: Сцена 1 — кадр вращения 150° (серия из 18 кадров через 20°, сменяются при скролле)
- Save as: `assets/story/scene1-turn-150.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame 8 of 18 of a 360° turntable: camera orbiting at 150° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

### `scene1-rv-awning.webp`

- Where on the page: Сцена 1, шаг 3 — поверх кадра 090°: тот же борт с выдвинутой маркизой, плашка «Маркиза 3,5–4 м»
- Save as: `assets/story/scene1-rv-awning.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. EXACTLY the same camera, scale, position and light as turntable frame scene1-turn-090 (pure right side profile), but with the 3.5–4 m awning extended above the open sliding door, warm LED strip glowing, a folding table and two folding chairs under it. It cross-fades over frame 090, so the van body must align pixel-perfectly. 
```

### `spread1-photo-main.webp`

- Where on the page: Разворот 1 (бенто) — плитка 2×2 слева: салон
- Save as: `assets/story/spread1-photo-main.webp`
- PREVIEW size now: **1024×1024 px** (1:1). Final size later: 1600×1600.
- Background: full-frame photo, no transparency

Prompt:

```
Interior of the camper van at night lit by warm linear LED strips and soft indirect artificial light, view from the cab towards the rear: grey sofa along the left wall, kitchen with rounded matte fronts along the right wall, curved cabinet doors, smooth wall-to-ceiling transition, rounded windows, warm linear light strip in the ceiling, light matte surfaces and brushed metal. Dark night landscape with a faint mountain silhouette visible through the windows. Wide-angle architectural interior photography, eye level. Square 1:1 composition for a bento tile with rounded corners; keep the subject away from the corners.
```

### `spread1-photo-detail.webp`

- Where on the page: Разворот 1 (бенто) — плитка 1×1: макро материалов
- Save as: `assets/story/spread1-photo-detail.webp`
- PREVIEW size now: **768×768 px** (1:1). Final size later: 800×800.
- Background: full-frame photo, no transparency

Prompt:

```
Macro detail of camper interior materials: matte light furniture front with a large radius corner, brushed aluminium edge, quartz worktop, warm artificial LED light grazing across the surfaces at night. Square 1:1 macro for a small bento tile, one rounded corner as the hero of the frame. Shallow depth of field, minimalist product photography, neutral warm whites and greys.
```

### `spread1-photo-kitchen.webp`

- Where on the page: Разворот 1 (бенто) — плитка 2×2 по центру: кухня
- Save as: `assets/story/spread1-photo-kitchen.webp`
- PREVIEW size now: **1024×1024 px** (1:1). Final size later: 1600×1600.
- Background: full-frame photo, no transparency

Prompt:

```
Camper kitchen block along the right wall next to the sliding door: two-burner gas hob under a glass lid, compact sink, rounded matte fronts, metal details, the sofa visible opposite. Night: warm under-cabinet LED and ceiling linear light, the open sliding door shows a dark lake shore lit by the awning LED. Square 1:1 three-quarter interior view for a bento tile, calm editorial style.
```

### `scene2-rv-roof.webp`

- Where on the page: Сцена 2, шаг 1 — вид сверху на крышу с панелями, «Неделя без единой розетки»
- Save as: `assets/story/scene2-rv-roof.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. High three-quarter view from above the front-left, showing the whole roof: full-length roof rack covered with solar panels, roof vents. Blue hour by an open mountain lake: luminous deep-blue sky reflected in the glossy paint, warm glow from the interior windows and the awning LED strip. Same canvas placement (centred, ≈ 78% width). Full-frame image in the scene's setting.
```

### `scene2-rv-xray-water.webp`

- Where on the page: Сцена 2, шаг 2 — «рентген» борта: баки и бойлер, плашка «Вода»
- Save as: `assets/story/scene2-rv-xray-water.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Technical x-ray side view of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: the body shell rendered semi-transparent / ghosted, inside visible a fresh water tank and a boiler, an insulated grey water tank under the floor, shower area at the rear, kitchen sink; water lines shown as clean tubes. Night tones: deep blue ambience, warm interior glow. Exactly the same position and scale as the side profile overview states. Full-frame image in the scene's setting. Leave space above the van for labels.
```

### `scene2-rv-xray-climate.webp`

- Where on the page: Сцена 2, шаг 3 — «рентген»: отопитель, кондиционер, люки, плашки климата
- Save as: `assets/story/scene2-rv-xray-climate.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Technical x-ray side view of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people, ghosted body shell: inside visible a compact rooftop monoblock air conditioner, an autonomous diesel air heater under the floor connected to the vehicle fuel tank, a heater with boiler, roof vents with fans in the living area and in the bathroom, a gas bottle in a separate vented compartment. Night tones: deep blue ambience, warm artificial highlights. Same position/scale as the other side states. Full-frame image in the scene's setting.
```

### `scene2-rv-cabin.webp`

- Where on the page: Сцена 2, шаг 4 — приближение к кабине, видно iPad на торпеде
- Save as: `assets/story/scene2-rv-cabin.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Close-up of the cab of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people seen through the open driver door / side window at night: a large 13-inch tablet mounted on the centre of the dashboard next to the driver, screen glowing softly. Framed as a 2× zoom of the side view centred on the cab. Leave the right 35% empty for text.
```

### `scene2-detail-panel.webp`

- Where on the page: Сцена 2, шаг 4 — картинка внутри плашки: интерфейс на iPad
- Save as: `assets/story/scene2-detail-panel.webp`
- PREVIEW size now: **900×600 px** (3:2). Final size later: 1200×800.
- Background: full-frame photo, no transparency

Prompt:

```
Front-on close-up of a 13-inch tablet screen showing a dark camper control dashboard UI: battery charge, water levels, heating, lights as clean tiles on a near-black background, neutral white typography and grey widgets, no brand names, no readable text required. Night reflections on the glass. Product photography.
```

### `spread2-photo-main.webp`

- Where on the page: Разворот 2 (бенто) — плитка 2×2 справа: фактура 3D-печати
- Save as: `assets/story/spread2-photo-main.webp`
- PREVIEW size now: **1024×1024 px** (1:1). Final size later: 1600×1600.
- Background: full-frame photo, no transparency

Prompt:

```
Large 3D-printed interior panel of a camper van, matte ASA/PETG surface, visible print layers turned into an aesthetic texture of ribs and patterns, rounded edge joining an aluminium structural profile. Workshop at night under clean artificial lights (soft overhead panels + a grazing side light that brings out the layer lines), close editorial product photography, neutral greys and warm white. Square 1:1 composition for a bento tile.
```

### `spread2-photo-detail.webp`

- Where on the page: Разворот 2 (бенто) — плитка 1×1: макро стыка шип-паз
- Save as: `assets/story/spread2-photo-detail.webp`
- PREVIEW size now: **768×768 px** (1:1). Final size later: 800×800.
- Background: full-frame photo, no transparency

Prompt:

```
Macro of a hidden tongue-and-groove joint between two 3D-printed panels fixed with a single screw to an aluminium profile, precise fit, no glue, square 1:1 macro for a small bento tile, artificial grazing workshop light at night, shallow depth of field, neutral palette.
```

### `spread2-photo-module.webp`

- Where on the page: Разворот 2 (бенто) — плитка 2×2 слева: модуль в разборе
- Save as: `assets/story/spread2-photo-module.webp`
- PREVIEW size now: **1024×1024 px** (1:1). Final size later: 1600×1600.
- Background: full-frame photo, no transparency

Prompt:

```
Exploded flat-lay of a camper kitchen module on a light workshop table: aluminium frame, laser-cut panels, 3D-printed connectors and brackets, fronts and a worktop, laid out neatly, top-down view, soft artificial overhead workshop light, square 1:1 catalogue-like product photography for a bento tile.
```

### `scene3-rv-xray.webp`

- Where on the page: Сцена 3, шаг 1 — «рентген» борта с контурами модулей, «Не один автодом, а конструктор»
- Save as: `assets/story/scene3-rv-xray.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Side profile of the same Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people rendered as a clean technical x-ray: body shell ghosted light grey, interior modules (bed, kitchen, wardrobe, bathroom capsule, seats) shown as simple rounded solid blocks. Night, dark studio with clean artificial top and rim lights. Exactly the same position/scale as the side overview states. Full-frame image in the scene's setting.
```

### `scene3-rv-exploded.webp`

- Where on the page: Сцена 3, шаг 2 — модули «вынуты» и парят над машиной
- Save as: `assets/story/scene3-rv-exploded.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Same side x-ray view of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people, but the interior modules (bed, kitchen block, wardrobe, bathroom capsule, seats) are lifted out and float in a neat row above the roof, aligned to a grid, as in an exploded product diagram. Dark studio, artificial top and rim lights, light grey modules. Same van position and scale. Full-frame image in the scene's setting.
```

### `scene3-layout-travel.webp`

- Where on the page: Сцена 3, шаг 3 — компоновка «Двое в долгом путешествии»
- Save as: `assets/story/scene3-layout-travel.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people with a full interior layout: shower and toilet capsule at the rear, large water tank, kitchen, sofa-bed, storage for equipment. Modules as clean light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```

### `scene3-layout-weekend.webp`

- Where on the page: Сцена 3, шаг 4 — компоновка «Один на выходные»
- Save as: `assets/story/scene3-layout-weekend.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: bathroom capsule and wardrobe removed, replaced by open space for outdoor gear (bike, boards), plus a short kitchen block. Modules as light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```

### `scene3-layout-work.webp`

- Where on the page: Сцена 3, шаг 5 — компоновка «Работа из фургона»
- Save as: `assets/story/scene3-layout-work.webp`
- PREVIEW size now: **1600×900 px** (16:9). Final size later: 3200×1800.
- Background: full-frame photo, no transparency

Prompt:

```
Same side x-ray of the Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people: two seats facing a table instead of part of the cabinets, the bed placed across the rear. Modules as light grey rounded blocks. Same position/scale. Full-frame image in the scene's setting.
```

### Turntable frames for pass B and C

Same prompt as the frames above, only the angle changes. Template:

```
Mercedes-Benz Sprinter 4x4 expedition camper van, medium wheelbase L2 (about 5.9 m long, NOT the long L3), high roof, glossy dark grey body (deep graphite grey ≈ #3C4045, clearly grey not black, high-gloss clear coat with crisp reflections, no metallic flake), black wheels, all-terrain tyres, raised clearance, skid plates, full-length roof rack with solar panels, rear ladder, no logos, no people. Frame N of 18 of a 360° turntable: camera orbiting at {ANGLE}° (0° front, 90° right side, 180° rear, 270° left side). Lighting: blue hour just after sunset: the sky is still luminous deep blue, the landscape is clearly readable (not pitch black); the van is lit like a premium car commercial — a large soft key light from camera left, clean rim lights tracing the body lines, warm interior and awning LED glow. Awning retracted, doors closed. Full-frame photo of the van in its setting (same blue-hour mountain plateau in every frame), van centred, wheels on the lower fifth, van length about 78% of canvas width at the 90° side view, Scroll-driven 360° turntable: 18 frames, one every 20° (10°, 30°, 50° … 350°). Angle = camera position orbiting the van at a constant distance and height (camera at headlight height, slightly above): 0° = camera straight in front of the van, 90° = camera on the van's RIGHT side (sliding door + awning side), 180° = straight behind, 270° = left side. The van itself never moves: same centre point, same wheel baseline at 82% of canvas height, same scale in every frame, awning RETRACTED, doors closed, identical blue-hour lighting (soft key light from camera left, clean rim lights, luminous blue sky reflections in the glossy paint) that stays fixed relative to the camera. Best way to get consistent frames: render from a 3D model, or generate ONE 360° orbit turntable video (image-to-video from the hero image) and cut it into 18 frames.
```

Preview size 1600×900, transparent background, file `assets/story/scene1-turn-{ANGLE as 3 digits}.webp`.
