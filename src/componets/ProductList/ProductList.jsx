import React, { useState, useEffect } from 'react';
import axios from 'axios';
// ১. Recharts ইমপোর্ট করা
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const ProductList = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("সব");

    const phoneNumber = "8801819976046"; 

    // ২. বাৎসরিক বিক্রয় ডাটা (ডামি ডাটা)
    const salesData = [
        { year: '২০২১', sold: 400000, target: 500000 },
        { year: '২০২২', sold: 600000, target: 700000 },
        { year: '২০২৩', sold: 550000, target: 800000 },
        { year: '২০২৪', sold: 900000, target: 950000 },
        { year: '২০২৫', sold: 1200000, target: 1100000 },
    ];

    useEffect(() => {
        axios.get('/products.json')
            .then(res => {
                setAllProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filterProducts = (categoryName) => {
        setActiveTab(categoryName);
        if (categoryName === "সব") {
            setFilteredProducts(allProducts);
        } else {
            const result = allProducts.filter(item => item.category === categoryName);
            setFilteredProducts(result);
        }
    };

    const handleOrder = (product) => {
        const message = `আসসালামু আলাইকুম, আমি আপনার দোকান থেকে ${product.name} অর্ডার করতে চাই।`;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    };

    if (loading) return <div className="text-center mt-20 loading loading-spinner loading-lg text-green-600"></div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-10" data-theme="light">
            {/* Header */}
            <div className="bg-green-700 text-white p-8 text-center shadow-lg">
                <h1 className="text-3xl font-black italic">📈 বাবার শস্য ভাণ্ডার - ড্যাশবোর্ড</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-8">
                
                {/* ৩. চার্ট সেকশন (বিক্রয় রিপোর্ট) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        📊 বাৎসরিক বিক্রয় ও লক্ষ্যমাত্রা (Sales vs Target)
                    </h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => `৳${value.toLocaleString()}`}
                                />
                                <Legend />
                                {/* 'sold' হলো কত টাকা বিক্রি হয়েছে (সবুজ) */}
                                <Bar dataKey="sold" name="মোট বিক্রি (৳)" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                {/* 'target' হলো কত টাকার টার্গেট ছিল (ধূসর/কমলা) */}
                                <Bar dataKey="target" name="লক্ষ্যমাত্রা (৳)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-slate-500 italic text-center">
                        * প্রতি বছর কত টাকা বিক্রি হয়েছে এবং কত টাকা হওয়ার টার্গেট ছিল তার চিত্র।
                    </div>
                </div>

                {/* প্রোডাক্ট ফিল্টার ট্যাব */}
                <div className="flex justify-center mb-10 overflow-x-auto">
                    <div className="tabs tabs-boxed bg-white p-2 border border-slate-200 shadow-sm flex-nowrap">
                        {["সব", "চাল", "ডাল", "তেল", "বীজ"].map(cat => (
                            <button 
                                key={cat}
                                onClick={() => filterProducts(cat)}
                                className={`tab px-8 font-bold transition-all ${activeTab === cat ? 'tab-active !bg-green-600 !text-white' : 'text-slate-500'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* প্রোডাক্ট গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="card bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl transition-all">
                            <figure className="bg-slate-50 h-40 flex items-center justify-center">
                                <span className="text-7xl">{product.image}</span>
                            </figure>
                            <div className="card-body p-5">
                                <h2 className="card-title text-slate-800 font-bold">{product.name}</h2>
                                <div className="mt-4 flex items-end gap-1">
                                    <span className="text-3xl font-black text-green-700">৳{product.price}</span>
                                    <span className="text-slate-400 text-xs font-bold">/কেজি</span>
                                </div>
                                <button 
                                    onClick={() => handleOrder(product)}
                                    className="btn btn-block bg-[#ffd814] hover:bg-[#f7ca00] border-none text-black font-bold rounded-full mt-5 shadow-sm"
                                >
                                    অর্ডার করুন
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;