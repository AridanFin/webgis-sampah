import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("warga");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data);

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          role: role,
        },
      ]);

    if (profileError) {
      console.log(profileError);
      alert(profileError.message);
      return;
    }

    alert("Register berhasil");
    navigate("/");
  };

  return (
    <div className="container">
      <form className="card" onSubmit={handleRegister}>

        <h1>Register</h1>

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="warga">Warga</option>
          <option value="transporter">Transporter</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">
          Register
        </button>

        <p>
          Sudah punya akun? <Link to="/">Login</Link>
        </p>

      </form>
    </div>
  );
}