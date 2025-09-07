interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
const calculateExercises = (array: number[], target: number): Result => {
  const periodLength = array.length;
  const trainingDays = array.filter((n) => n != 0).length;
  const average = array.reduce((i, o) => i + o, 0) / array.length;
  const success = target < average;

  const { rating, ratingDescription } =
    average / target >= 1
      ? { rating: 3, ratingDescription: "good" }
      : average / target >= 0.5
      ? { rating: 2, ratingDescription: "not too bad but could be better" }
      : { rating: 1, ratingDescription: "bad" };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
