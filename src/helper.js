const getColor = vote => {
  if (vote >= 15) return "#4caf50";
  else if (vote >= 12) return "#8BC34A";
  else if (vote >= 9) return "#CDDC39";
  else if (vote >= 6) return "#FFEB3B";
  else if (vote >= 0) return "#FF9800";
  else return "#f44336";
};

const getEmoji = vote => {
  if (vote >= 15) return "ec ec-rofl";
  else if (vote >= 12) return "ec ec-laughing";
  else if (vote >= 9) return "ec ec-smiley";
  else if (vote >= 6) return "ec ec-slightly-smiling-face";
  else if (vote >= 0) return "ec ec-confused";
  else return "ec ec-angry";
};

export { getColor, getEmoji };
