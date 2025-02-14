export const colors = {
  primary: "#1A1A1C",
  secondary: "#EFBB40",
  light: "#FFFFFF",
  yellow: "#EFBB40",
  gray: "#848484",
  lightGray: "#0000006b",
  red: "#d32f2f",
};

export const fonts = {
  secondaryFontFamily: "Poppins, sans-serif",
};


const typeColors: { [key: string]: string[] } = {
  fire: ["#FF5733", "#FF6F61", "#FF7043"], // Red/orange tones for Fire type
  water: ["#33A1FF", "#42A5F5", "#1E88E5"], // Blue tones for Water type
  grass: ["#66BB6A", "#81C784", "#388E3C"], // Green tones for Grass type
  electric: ["#FFEB3B", "#FFCA28", "#FFC107"], // Yellow tones for Electric type
  bug: ["#8BC34A", "#9E9E9E", "#D32F2F"], // Green/grey tones for Bug type
  ghost: ["#9C27B0", "#673AB7", "#3F51B5"], // Purple/blue tones for Ghost type
  fairy: ["#F48FB1", "#EC407A", "#D81B60"], // Pink tones for Fairy type
  poison: ["#AB47BC", "#9C27B0", "#8E24AA"], // Purple tones for Poison type
  psychic: ["#8E24AA", "#9C27B0", "#4CAF50"], // Purple/green tones for Psychic type
  flying: ["#00BCD4", "#03A9F4", "#2196F3"], // Sky blue tones for Flying type
  rock: ["#B0BEC5", "#78909C", "#607D8B"], // Grey tones for Rock type
  steel: ["#B0BEC5", "#78909C", "#607D8B"], // Grey tones for Steel type
  ice: ["#80DEEA", "#00ACC1", "#0288D1"], // Light blue tones for Ice type
  fighting: ["#D32F2F", "#F44336", "#E57373"], // Red tones for Fighting type
  dark: ["#212121", "#424242", "#616161"], // Dark grey tones for Dark type
  dragon: ["#673AB7", "#3F51B5", "#9C27B0"], // Purple tones for Dragon type
  normal: ["#9E9E9E", "#BDBDBD", "#757575"], // Grey tones for Normal type
  ground: ["#F4B400", "#F57C00", "#FF7043"], // Orange tones for Ground type
  
};

export function getRandomTypeColor(types: string[]): string {
  // Filter types to keep only those with color mappings
  const availableColors = types
    .map((type) => typeColors[type.toLowerCase()] || []) // Fetch colors for each type
    .flat(); // Flatten the array

  // If there are no available colors, return a default color
  if (availableColors.length === 0) return "#FFFFFF"; // Default background color

  // Pick a random color from the available colors
  const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
  
  return randomColor;
}