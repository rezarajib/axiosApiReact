import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("সব");

    useEffect(() => {
        // আমরা আমাদের তৈরি করা products.json থেকে ডাটা নিচ্ছি
        axios.get('/products.json') 
            .then(res => {
                setProducts(res.data);
                setFiltered(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // ক্যাটাগরি ফিল্টার লজিক
    const filterCategory = (cat) => {
        setActiveTab(cat);
        if (cat === "সব") {
            setFiltered(products);
        } else {
            setFiltered(products.filter(p => p.category === cat));
        }
    };

    if (loading) return <div className="text-center mt-20 loading loading-dots loading-lg text-success"></div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* নেভবার স্টাইল হেডার */}
            <div className="bg-green-700 text-white py-6 shadow-xl mb-10">
                <h1 className="text-4xl font-black text-center">🛒 রাজিবের মুদি বাজার</h1>
                <p className="text-center opacity-80 mt-2 text-sm uppercase tracking-widest">১০০% খাঁটি ও দেশি পণ্যের সমাহার</p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                
                {/* ক্যাটাগরি ট্যাব (DaisyUI) */}
                <div className="tabs tabs-boxed justify-center mb-10 bg-white p-2 shadow-sm inline-flex w-full">
                    {["সব", "চাল", "ডাল", "তেল", "বীজ", "দুগ্ধজাত"].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => filterCategory(cat)}
                            className={`tab font-bold ${activeTab === cat ? 'tab-active !bg-green-600 !text-white' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* প্রোডাক্ট গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map(product => (
                        <div key={product.id} className="card bg-white rounded-none border border-gray-200 hover:shadow-xl transition-all group">
                            <figure className="h-48 bg-gray-50 relative overflow-hidden">
                                <span className="text-7xl group-hover:scale-125 transition-transform duration-500">
                                    {product.image}
                                </span>
                                <div className="absolute top-2 left-2 badge badge-success text-white font-bold text-[10px]">PREMIUM</div>
                            </figure>

                            <div className="card-body p-5">
                                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                                <div className="flex items-center gap-1">
                                    <div className="rating rating-xs">
                                        {[1,2,3,4,5].map(s => (
                                            <input key={s} type="radio" className={`mask mask-star-2 ${s <= product.rating ? 'bg-orange-400' : 'bg-gray-200'}`} readOnly />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">({product.rating})</span>
                                </div>

                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-sm font-bold text-gray-900">৳</span>
                                    <span className="text-3xl font-black text-gray-900">{product.price}</span>
                                    <span className="text-gray-400 text-xs font-medium">/কেজি বা লিটার</span>
                                </div>

                                <p className="text-[11px] text-gray-500 mt-1 italic">📍 উৎপত্তি: {product.origin}</p>
                                
                                <div className="card-actions mt-6">
                                    <button className="btn btn-sm w-full bg-[#ffd814] hover:bg-[#f7ca00] border-none text-black font-bold rounded-full">
                                        ব্যাগে যোগ করুন
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;