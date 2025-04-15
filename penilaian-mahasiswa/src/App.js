import React, { useState } from 'react';

const App = () => {
  const jumlahMahasiswa = 10;
  const jumlahAspek = 4;

  const [penilaian, setPenilaian] = useState(
    Array.from({ length: jumlahMahasiswa }, () =>
      Array(jumlahAspek).fill(1)
    )
  );

  const handleChange = (mahasiswaIndex, aspekIndex, value) => {
    const newPenilaian = [...penilaian];
    newPenilaian[mahasiswaIndex][aspekIndex] = parseInt(value);
    setPenilaian(newPenilaian);
  };

  const handleSubmit = () => {
    const hasil = {};
    for (let aspek = 0; aspek < jumlahAspek; aspek++) {
      hasil[`aspek_penilaian_${aspek + 1}`] = {};
      for (let mhs = 0; mhs < jumlahMahasiswa; mhs++) {
        hasil[`aspek_penilaian_${aspek + 1}`][`mahasiswa_${mhs + 1}`] =
          penilaian[mhs][aspek];
      }
    }
  
    const jsonString = JSON.stringify(hasil, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'penilaian_mahasiswa.json';
    a.click();
    URL.revokeObjectURL(url);
  
    alert("File JSON berhasil didownload.");
  };
  

  return (
    <div style={{ padding: 20 }}>
      <h2>Aplikasi Penilaian Mahasiswa</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Mahasiswa</th>
            {[...Array(jumlahAspek)].map((_, i) => (
              <th key={i}>Aspek penilaian {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(jumlahMahasiswa)].map((_, mhsIndex) => (
            <tr key={mhsIndex}>
              <td>Mahasiswa {mhsIndex + 1}</td>
              {[...Array(jumlahAspek)].map((_, aspekIndex) => (
                <td key={aspekIndex}>
                  <select
                    value={penilaian[mhsIndex][aspekIndex]}
                    onChange={(e) =>
                      handleChange(mhsIndex, aspekIndex, e.target.value)
                    }
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: 20 }} onClick={handleSubmit}>
        Simpan
      </button>
    </div>
  );
};

export default App;
