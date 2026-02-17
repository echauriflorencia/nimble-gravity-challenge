import { useEffect, useState } from "react";

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";
function App() {

  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/candidate/get-by-email?email=florenciaechauri@gmail.com`
        );

        if (!response.ok) {
          throw new Error(`HTTP error - Status: ${response.status}`);
        }

        const data = await response.json();
        setCandidate(data);
      } catch (error) {
        console.error("Error fetching candidate:", error.message);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/jobs/get-list`
        );

        if (!response.ok) {
          throw new Error(`HTTP error - Status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs: ", error.message);
      }
    };

    fetchCandidate();
    fetchJobs();
  }, []);


  return (
    <>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
        </div>
      ))}
    </>
  );
}

export default App;
