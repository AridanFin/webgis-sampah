import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Map from "../components/Map";

export default function Warga() {

  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [berat, setBerat] = useState("");
  const [position, setPosition] = useState(null);

 const handleLogout = async () => {

  const { error } = await supabase.auth.signOut();

  if (error) {
    alert(error.message);
    return;
  }

  navigate("/");
};

  const simpanData = async () => {

    if (!position) {
      alert("Pilih lokasi di peta");
      return;
    }

    const { error } = await supabase
      .from("warga")
      .insert([
        {
          nama,
          jenis_sampah: jenis,
          berat,
          status: "Menunggu",
          pembayaran: "Belum",
          location: `POINT(${position.lng} ${position.lat})`
        }
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Data berhasil disimpan");
    }
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <h2>WebGIS Sampah</h2>

        <button>Beranda</button>
        <button>Lihat Peta</button>
        <button>Data Sampah</button>
        <button>Profil</button>

        <button className="logout" onClick={handleLogout}>
          Logout
        </button>

      </div>

      <div className="content">

        <h1>Dashboard Warga</h1>

        <div className="card-dashboard">

          <h3>Input Data Sampah</h3>

          <input
            type="text"
            placeholder="Nama"
            onChange={(e) => setNama(e.target.value)}
          />

          <input
            type="text"
            placeholder="Jenis Sampah"
            onChange={(e) => setJenis(e.target.value)}
          />

          <input
            type="number"
            placeholder="Berat Sampah"
            onChange={(e) => setBerat(e.target.value)}
          />

          <Map setPosition={setPosition} />

          <button onClick={simpanData}>
            Simpan Data
          </button>

        </div>

      </div>

    </div>
  );
}