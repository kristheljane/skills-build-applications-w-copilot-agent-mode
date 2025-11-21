import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0"><i className="bi bi-people"></i> Teams</h2>
        </div>
        <div className="card-body">
          {teams.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{team.name || <span className="text-muted">No Name</span>}</td>
                      <td>
                        <button className="btn btn-outline-info btn-sm me-2">View</button>
                        <button className="btn btn-outline-primary btn-sm">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-info">No teams found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Teams;
