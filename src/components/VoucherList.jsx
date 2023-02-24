import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from "swr";

const BillingList = () => {
    const { mutate } = useSWRConfig();
    const fetcher = async () => {
        const response = await axios.get('http://localhost:5000/voucher_parkir');
        return response.data;
    };

    const { data } = useSWR('voucher_parkir', fetcher);
    if (!data) return <h2>Sedang menghubungkan ke database...</h2>;

    const deleteVoucher = async (voucherId) => {
        await axios.delete(`http://localhost:5000/voucher_parkir/${voucherId}`);
        mutate('voucher_parkir');
    };

    return (
        <div className='flex flex-col mt-5'>
            <div className="w-full">
                <Link to="/add" className='bg-green-500  hover:bg-green-700 border-slate-200 text-white font-bold py-2 px-4 rounded-lg'>Add New</Link>
                <div className="relative shadow roundend-lg mt-3">
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                                <th className='py-3 px-1 text-center'>No</th>
                                <th className='py-3 px-6'>Nama Pemilik</th>
                                <th className='py-3 px-6'>Jenis Kendaraan</th>
                                <th className='py-3 px-6'>Merek</th>
                                <th className='py-3 px-6'>Plat</th>
                                <th className='py-3 px-6'>Paket Parkir</th>
                                <th className='py-3 px-6'>Tanggal Expired</th>
                                <th className='py-3 px-1 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((voucher, index) => {
                                return <tr className='bg-white border-b' key={voucher.id}>
                                    <td className='py-3 px-1 text-center'>{index + 1}</td>
                                    <td className='py-3 px-6 font-medium text-gray-900'>{voucher.nama_pemilik}</td>
                                    <td className='py-3 px-6'>{voucher.jenis_kendaraan}</td>
                                    <td className='py-3 px-6'>{voucher.merk}</td>
                                    <td className='py-3 px-6'>{voucher.plat}</td>
                                    <td className='py-3 px-6'>{voucher.paket_parkir}</td>
                                    <td className='py-3 px-6'>{voucher.tanggal_expired}</td>
                                    <td className='py-3 px-1 text-center'>
                                        <Link to={`/edit/${voucher.id}`} className='font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1'>Edit</Link>
                                        <button onClick={() => deleteVoucher(voucher.id)} className='font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white'>Delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BillingList