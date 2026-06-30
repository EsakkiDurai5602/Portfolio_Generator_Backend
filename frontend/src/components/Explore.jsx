import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "./Header";

function Explore() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicPortfolios = async () => {
      try {
        const response = await API.get("/portfolio/public");
        if (response.data && response.data.data) {
          setPortfolios(response.data.data.portfolios || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load portfolios");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicPortfolios();
  }, []);

  return (
    <>
      <Header />
      <div className="features" style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Explore Professional Portfolios</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '16px' }}>
          Discover portfolios built by industry experts, developers, designers, and engineers.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>Loading Portfolios...</h3>
          </div>
        ) : error ? (
          <div className="error-message" style={{ textAlign: 'center' }}>{error}</div>
        ) : portfolios.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <h3>No Published Portfolios Yet</h3>
            <p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>Be the first to publish your portfolio from the dashboard!</p>
          </div>
        ) : (
          <div className="cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {portfolios.map((item) => (
              <div
                key={item._id}
                className="card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '320px' }}
                onClick={() => navigate(`/portfolio/${item.userId?._id || item.email}`)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={item.profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      alt={item.fullName}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-color)' }}
                    />
                    <div>
                      <h3 style={{ fontSize: '18px', margin: 0, fontWeight: '700', color: 'var(--text-primary)' }}>{item.fullName}</h3>
                      <p style={{ color: 'var(--accent-color)', fontSize: '14px', margin: 0, fontWeight: '600' }}>{item.title}</p>
                    </div>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {item.about}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '12px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    By {item.userId?.name || "Member"}
                  </span>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--accent-color)' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      {item.likes ? item.likes.length : 0}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-color)' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      {item.comments ? item.comments.length : 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Explore;
