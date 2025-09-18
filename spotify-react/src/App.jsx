import { useEffect, useState } from "react";
import { redirectToAuthCodeFlow, getAccessToken } from "./spotifyAuth";

function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      // No code? → Redirect to Spotify login
      redirectToAuthCodeFlow();
    } else {
      // Got a code? → Exchange it for an access token
      getAccessToken(code).then(async (data) => {
        const accessToken = data.access_token;
        
        // Fetch recently played tracks
        const resp = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        const recentData = await resp.json();
        setProfile(recentData);  // store it in state
      });
    }
  }, []);

if (!profile || !profile.items) {
  return <h1>Loading / redirecting...</h1>;
}

return (
  <div>
    <h1>Last 10 songs you played</h1>
    <ul>
      {profile.items.map((item, index) => (
        <li key={index}>
          <strong>{item.track.name}</strong> by {item.track.artists.map(a => a.name).join(", ")}
          <br />
          <img src={item.track.album.images[0]?.url} alt="album art" width={80} />
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;