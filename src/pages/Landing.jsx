import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        padding: "2rem",
        color: "#fff",
      }}
    >
      <h1>Green Haven</h1>
      <p>
        Welcome to the best place for unique houseplants. Discover our
        collection now!
      </p>
      <button onClick={() => navigate("/products")}>Get Started</button>
    </div>
  );
}

export default Landing;
