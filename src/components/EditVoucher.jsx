import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditVoucher = () => {
    const [name, setName] = useState("");
    const [jenis, setJenis] = useState("");
    const [merk, setMerk] = useState("");
    const [plat, setPlat] = useState("");
    const [paket, setPaket] = useState("");
    const [expired, setExpired] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();

    var jsonDate = (new Date()).toJSON();

    useEffect(() => {
        const getVoucherById = async () => {
            const response = await axios.get(`http://localhost:5000/voucher_parkir/${id}`);
            setName(response.data.nama_pemilik);
            setJenis(response.data.jenis_kendaraan);
            setMerk(response.data.merk);
            setPlat(response.data.plat);
            setPaket(response.data.paket_parkir);
            setExpired(response.data.tanggal_expired);
        }
        getVoucherById();
    }, [id]);

    const updateVoucher = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/voucher_parkir/${id}`, {
            nama_pemilik: name,
            jenis_kendaraan: jenis,
            merk: merk,
            plat: plat,
            paket_parkir: paket,
            tanggal_expired: expired
        });
        navigate("/");
    }

    return (
        <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
            <span><a href='/' className="material-symbols-outlined">arrow_back</a></span>
            <form onSubmit={updateVoucher} className='my-10'>
                <div className="flex flex-col">
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Nama Pemilik</label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Nama Pemilik' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Jenis Kendaraan</label>
                        <select value={jenis} className="py-3 mt-1 border px-3 w-full" onChange={(e) => setJenis(e.target.value)}>
                            <option value="">Masukkan Pilihan</option>
                            <option value="Mobil">Mobil</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Merk</label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Merk' value={merk} onChange={(e) => setMerk(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Plat</label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Plat' value={plat} onChange={(e) => setPlat(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Harga Paket</label>
                        <select value={paket} className="py-3 mt-1 border px-3 w-full" onChange={(e) => setPaket(e.target.value)}>
                            <option value="">Masukkan Pilihan</option>
                            <option value="20.000">20.000</option>
                            <option value="10.000">10.000</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="font-bold text-slate-700">Expired (format: {jsonDate})</label>
                        <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder='Expired' value={expired} onChange={(e) => setExpired(e.target.value)} />
                    </div>
                    <button type='submit' className='w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default EditVoucher