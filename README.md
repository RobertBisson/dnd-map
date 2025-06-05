# DnD Map

This project is a virtual tabletop map tool for Dungeons & Dragons, built with React, Redux, and Vite. It allows Dungeon Masters to manage battle maps, tokens, and visibility for online or in-person play.

## Features

- **Battle Map Management**: Load and switch between multiple maps, grouped by campaign acts or one-shots.
- **Grid System**: Each map supports a configurable grid for token placement and movement.
- **Token Management**: Add, move, and remove player, NPC, and monster tokens. Tokens have stats like health, armor, and initiative.
- **Drag-and-Drop**: Move tokens between grid squares using drag-and-drop (powered by `@hello-pangea/dnd`).
- **Visibility Controls**: Toggle grid square visibility for fog-of-war effects, including quick reveal/hide with keyboard/mouse shortcuts.
- **Persistent State**: All map and token states are saved in local storage and synced across browser tabs.
- **DM Tools**: Dedicated DM panel for character sheets and quick stat reference.
- **Animated Maps**: Support for embedding animated/YouTube maps.
- **Context Menus**: Right-click context menus for grid squares and tokens for quick actions (add, wound, kill, etc).
- **Customizable Assets**: Easily add new maps and tokens by placing images in the assets folder and updating config files.

## Getting Started

### Scripts

- `npm start` — Runs the app in development mode at [http://localhost:5173](http://localhost:5173) (Vite default).
- `npm run build` — Builds the app for production to the `build` folder.
- `npm run preview` — Previews the production build locally.

### Requirements

- Node.js and npm installed.
- Place your map and token images in the `src/assets` directory.

### Project Structure

- `src/screens/MapScreen/` — Main map and grid logic.
- `src/components/CharToken.tsx` — Token rendering and interaction.
- `src/Services/assetLoading/MapSets.ts` — Map definitions and groupings.
- `src/Services/assetLoading/TokenSets.ts` — Token definitions for monsters, NPCs, and players.
- `src/Services/store/` — Redux store and reducers for state management.

## Learn More

- [React documentation](https://reactjs.org/)
- [Redux documentation](https://redux.js.org/)
- [Vite documentation](https://vitejs.dev/)

## License

This project is for personal use and not intended for commercial distribution.
