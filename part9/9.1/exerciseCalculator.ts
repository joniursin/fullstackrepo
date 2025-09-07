interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExerciseCalculator = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (
    !isNaN(Number(args[2])) &&
    Number(
      args
        .slice(3)
        .map(Number)
        .every((n) => !isNaN(n))
    )
  ) {
    return {
      target: Number(args[2]),
      array: args.slice(3).map(Number),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (target: number, array: number[]): Result => {
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

if (require.main === module) {
  try {
    const { target, array } = parseArgumentsExerciseCalculator(process.argv);
    console.log(calculateExercises(target, array));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
};
