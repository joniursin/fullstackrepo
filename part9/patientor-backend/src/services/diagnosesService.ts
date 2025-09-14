import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const getData = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getData,
};
