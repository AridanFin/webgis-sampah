import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Admin() 
{
const navigate = useNavigate()

async function logout() {
  await supabase.auth.signOut()
  navigate('/')
}
  const [data, setData] = useState([])

  async function getData() {

    const { data } = await supabase
      .from('warga')
      .select('*')

    setData(data)
  }

  async function hapusData(id) {

    await supabase
      .from('warga')
      .delete()
      .eq('id', id)

    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="admin-container">

      <h1>Dashboard Admin</h1>
      <button className="btn-logout" onClick={logout}>
  Logout
</button>

      <table className="table-admin">

        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>

          {
            data.map((item) => (
              <tr key={item.id}>

                <td>{item.nama}</td>
                <td>{item.jenis_sampah}</td>
                <td>{item.status}</td>

                <td>
                  <button
                    className="btn-hapus"
                    onClick={() => hapusData(item.id)}
                  >
                    Hapus
                  </button>
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  )
}