import { useEffect, useState } from "react";
import JobItem from "./components/JobItem";

function App() {

  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [globalMessage, setGlobalMessage] = useState(null);
  const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/candidate/get-by-email?email=florenciaechauri@gmail.com`
        );

        if (!response.ok) {
          throw new Error(`HTTP error - Error fetching candidate `);
        }

        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/jobs/get-list`
        );

        if (!response.ok) {
          throw new Error(`HTTP error - Error fetching jobs `);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCandidate();
    fetchJobs();
  }, []);

  return (
    <>
      {globalMessage && (
        <div style={{
          padding: "1rem",
          marginBottom: "1rem",
        }}>
          {globalMessage}
        </div>
      )}
      {error && (
        <p style={{ padding: "1rem", color: "red" }}>
          {error}
        </p>
      )}
      {jobs.map(job => (
        <JobItem
          key={job.id}
          job={job}
          candidate={candidate}
          onApplicationResult={setGlobalMessage}
        />
      ))}
    </>
  );
}

export default App;
