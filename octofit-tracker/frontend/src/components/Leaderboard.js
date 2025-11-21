import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);
  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-warning text-dark">
          <h2 className="mb-0"><i className="bi bi-trophy"></i> Leaderboard</h2>
        </div>
        <div className="card-body">
          {leaders.length > 0 ? (
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
                  {leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{leader.name || <span className="text-muted">No Name</span>}</td>
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
            <div className="alert alert-info">No leaderboard data found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Leaderboard;
