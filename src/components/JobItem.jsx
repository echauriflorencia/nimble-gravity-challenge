import React, { useState } from "react";

function JobItem({ job }) {
    const [repoUrl, setRepoUrl] = useState("");

    return (
        <div style={{border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{job.title}</h3>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input 
                    type="text"
                    placeholder="Enter your GitHub repo URL"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                />

                <button>Submit</button>
            </div>
        </div>
    )

}

export default JobItem;