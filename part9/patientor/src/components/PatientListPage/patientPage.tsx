import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { useEffect, useState } from "react";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatient(id!);
      setPatient(patient);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      const diagnosesDict: Record<string, string> = {};
      diagnoses.forEach((d) => {
        diagnosesDict[d.code] = d.name;
      });
      setDiagnoses(diagnosesDict);
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) return <div>Patient not found</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <p>
        {patient.entries.map((e) => (
          <div>
            {e.date} {e.description}
            {e.diagnosisCodes?.map((c) => (
              <li key={c}>
                {c} {diagnoses[c]}
              </li>
            ))}
          </div>
        ))}
      </p>
    </div>
  );
};

export default PatientPage;
