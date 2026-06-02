import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Transporter() {

  const [data, setData] = useState([])

  async function getData() {

    const { data } = await supabase
      .from('warga')
      .select('*')

    setData(data)
  }

  async function updateStatus(id) {

    await supabase
      .from('warga')
      .update({
        status: 'Selesai'
      })
      .eq('id', id)

    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>

      <h1>Dashboard Transporter</h1>

      {
        data.map((item) => (
          <div key={item.id}>

            <h3>{item.nama}</h3>

            <p>{item.jenis_sampah}</p>

            <p>Status : {item.status}</p>

            <button onClick={() => updateStatus(item.id)}>
              Selesaikan
            </button>

          </div>
        ))
      }

    </div>
  )
}