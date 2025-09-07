const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (16 <= bmi && bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (17 <= bmi && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (18.5 <= bmi && bmi < 25) {
    return "Normal range";
  } else if (25 <= bmi && bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (30 <= bmi && bmi < 35) {
    return "Obese (Class I)";
  } else if (35 <= bmi && bmi < 40) {
    return "Obese (Class II)";
  } else if (bmi >= 40) {
    return "Obese (Class III)";
  }
};

console.log(calculateBmi(180, 74));
