export const getColorForPoints = (points: number) => {
  if (points < 10) {
    return "red.700";
  }
  if (points < 25) {
    return "red.600";
  }
  if (points < 50) {
    return "red.500";
  }
  if (points < 75) {
    return "red.400";
  }
  if (points < 100) {
    return "red.300";
  }
  if (points < 125) {
    return "yellow.600";
  }
  if (points < 150) {
    return "yellow.500";
  }
  if (points < 175) {
    return "yellow.400";
  }
  if (points < 200) {
    return "yellow.300";
  }
  if (points < 225) {
    return "green.300";
  }
  if (points < 250) {
    return "green.400";
  }
  if (points < 275) {
    return "green.500";
  }
  if (points < 300) {
    return "green.600";
  }

  return "teal.600";
};
