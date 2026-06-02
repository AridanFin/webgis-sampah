import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    console.log(profile);

    if (profileError || !profile) {
      alert("Data profile tidak ditemukan");
      return;
    }

    if (profile.role === "admin") {
      navigate("/admin");
    } else if (profile.role === "transporter") {
      navigate("/transporter");
    } else {
      navigate("/warga");
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleLogin}>
        <h1>Login WebGIS</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          Belum punya akun? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}