import patientData from "../data/patients";
import { Patient, NonSensitivePatient } from "../types";

const getData = (): Patient[] => {
  return patientData;
};

const getNonSensitiveData = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getData,
  getNonSensitiveData,
};
