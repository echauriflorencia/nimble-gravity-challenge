import React, { useState } from "react";

function JobItem({ job, candidate, onApplicationResult }) {
    const [repoUrl, setRepoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/";

    const handleSubmit = async () => {
        if (!candidate) {
            onApplicationResult("Candidate not loaded yet");
            return;
        }

        if (!repoUrl.trim()) {
            onApplicationResult("Please enter a repository URL");
            return;
        }

        try {
            setLoading(true);
            onApplicationResult(null);

            const response = await fetch(
                `${BASE_URL}api/candidate/apply-to-job`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uuid: candidate.uuid,
                        jobId: job.id,
                        candidateId: candidate.candidateId,
                        applicationId: candidate.applicationId,
                        repoUrl: repoUrl,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit application");
            }

            onApplicationResult("Application submitted successfully!");
            setRepoUrl("");
        } catch (error) {
            onApplicationResult(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{job.title}</h3>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                    name="repoUrl"
                    type="url"
                    placeholder="Enter your GitHub repo URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading || !repoUrl.trim()}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    )

}

export default JobItem;