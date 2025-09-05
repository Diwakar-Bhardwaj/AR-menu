# 3D Models Directory

This directory contains 3D model files for the food items displayed in the AR menu application.

## Supported Formats
- `.glb` (recommended)
- `.gltf`

## How to Add Models

1. Place your 3D model files in this directory
2. Name the files using the food item name in lowercase with hyphens instead of spaces
   - Example: "Margherita Pizza" → `margherita-pizza.glb`
3. The ModelViewer component will automatically load the appropriate model based on the food item name

## Model Requirements

- Models should be optimized for web viewing (under 5MB recommended)
- Use appropriate textures and materials
- Ensure the model is centered at the origin
- Scale should be reasonable (not too large or too small)

## Example Model Names
- `margherita-pizza.glb`
- `sushi-platter.glb`
- `cheeseburger.glb`
- `caesar-salad.glb`
- `pad-thai.glb`
- `tacos.glb`
- `pasta-carbonara.glb`
- `grilled-salmon.glb`
- `chicken-biryani.glb`
- `falafel-wrap.glb`
