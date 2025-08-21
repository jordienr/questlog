# Questlog - Type-Safe Icon System Demo

## 🎯 **Type-Safe Icon System**

This app demonstrates a **fully type-safe icon system** that loads SVG icons from the `assets/icons/` folder. Icons are imported statically for optimal performance and full TypeScript support.

## 🚀 **How It Works**

### **1. Add Icons (Simple Registry Update)**

Place SVG files in `assets/icons/` and add them to the registry:

```
assets/icons/
├── quest.svg         # ✅ Already working
├── sword.svg         # ✅ Already working
├── chest.svg         # ✅ Already working
└── magic-wand.svg    # ✅ Just added - works immediately!
```

### **2. Use Icons with Full Type Safety**

```tsx
// TypeScript autocomplete for available icon names
<Icon name="magic-wand" size={24} color={colors.accent} />
<Icon name="quest" size={32} color={colors.primary} />
<Icon name="new-icon" size={28} color={colors.success} />
```

### **3. Icon Buttons**

```tsx
<IconButton
  icon="magic-wand"
  title="Cast Spell"
  onPress={handleCastSpell}
  variant="accent"
  size="large"
/>
```

## 🎨 **Current Icons**

- **quest** - Quest/star icon
- **sword** - Sword icon
- **chest** - Treasure chest icon
- **magic-wand** - Magic wand icon (new!)

## 🔧 **Adding New Icons**

### **Step 1: Drop SVG File**

```
assets/icons/
└── dragon.svg
```

### **Step 2: Add to Registry**

Update `components/Icon.tsx`:

```tsx
// Import the new icon
import DragonIcon from "../assets/icons/dragon.svg";

// Add to the registry
const ICON_REGISTRY = {
  quest: QuestIcon,
  sword: SwordIcon,
  chest: ChestIcon,
  "magic-wand": MagicWandIcon,
  dragon: DragonIcon, // Add here
} as const;
```

### **Step 3: Use with Full Type Safety**

```tsx
<Icon name="dragon" size={32} color={colors.error} />
```

## ✨ **Features**

- **🚀 Type Safety**: Full TypeScript support with `IconName` type
- **⚡ Performance**: Icons bundled at build time
- **🎨 Theme Integration**: Works with your theme system
- **🔄 Auto-Discovery**: Icons automatically appear in showcases
- **📱 Instant Rendering**: No loading states or delays
- **🛡️ Error Prevention**: TypeScript prevents using non-existent icons

## 📱 **App Structure**

- **Home Tab**: Icon showcase and examples
- **Settings Tab**: Theme switcher and icon gallery
- **Stats Tab**: Coming soon...

## 🎮 **Theme System**

- **Dark Theme**: Classic dark with white text
- **Light Theme**: Clean light with black text
- **Parchment Theme**: Warm beige with brown text

## 🛠️ **Tech Stack**

- **React Native** + **Expo**
- **NativeWind** (Tailwind CSS)
- **Zustand** (State management)
- **Type-Safe Icon Registry** (Custom implementation)

## 🚀 **Getting Started**

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development**

   ```bash
   npm start
   ```

3. **Add Icons**
   - Drop SVG files in `assets/icons/`
   - Add to `ICON_REGISTRY` in `components/Icon.tsx`
   - Use with full type safety in your components

## 📚 **Documentation**

- **Icon System**: `docs/ICONS.md`
- **Components**: `components/` folder
- **Utilities**: `utils/` folder

---

**🎯 The beauty of this system: Type-safe icons with optimal performance!**
