export const stepList = () => {};

export const calorieBurn = ({ met, weight, duration }) => {
  const metValue = parseFloat(met);
  const weightKg = parseFloat(weight);
  const durationHours = parseFloat(duration);
  const caloriesPerMinute = (metValue * weightKg * 3.5) / 200;
  const totalCalories = caloriesPerMinute * durationHours * 60; // convert hours to minutes
  return totalCalories;
};
