/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import PaginateComic from "@/components/Client/Paginate";
import axiosClient from "@/libs/axiosClient";
import { difference } from "@/utils/date";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Định nghĩa kiểu dữ liệu cho giao dịch
interface Transaction {
    id: number;
    user_id: number;
    type: 'deposit' | 'withdraw' | 'purchase';
    amount: string;
    status: 'pending' | 'completed' | 'failed';
    description: string;
    created_at: string;
    updated_at: string;
}

function Page() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState({
        type: "all",
        status: "all"
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const itemsPerPage = 10; // Số lượng giao dịch hiển thị trên một trang

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosClient.get('/api/transactions');
                
                // Lấy danh sách giao dịch từ phản hồi API
                if (res.data && res.data.transactions) {
                    // Sắp xếp giao dịch mới nhất lên đầu tiên
                    const sortedTransactions = [...res.data.transactions].sort((a, b) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    });
                    
                    setTransactions(sortedTransactions);
                    
                    // Tính toán số trang dựa trên số lượng giao dịch
                    const totalItems = sortedTransactions.length;
                    const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
                    setTotalPages(calculatedTotalPages);
                }
            } catch (error: any) {
                console.error("Error fetching transactions:", error);
                
                if (error.response) {
                    // Xử lý các mã lỗi phản hồi từ server
                    if (error.response.status === 401) {
                        setError("Bạn cần đăng nhập để xem lịch sử giao dịch");
                        localStorage.setItem('redirectAfterLogin', window.location.pathname);
                        setTimeout(() => {
                            router.push('/login');
                        }, 2000);
                    } else if (error.response.status === 403) {
                        setError("Bạn không có quyền xem thông tin này");
                    } else {
                        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau");
                    }
                } else {
                    setError("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (transactions.length > 0) {
            applyFilters();
        }
    }, [filter, currentPage, transactions]);

    const applyFilters = () => {
        let filtered = [...transactions];
        
        // Lọc theo loại giao dịch
        if (filter.type !== "all") {
            filtered = filtered.filter(item => item.type === filter.type);
        }
        
        // Lọc theo trạng thái
        if (filter.status !== "all") {
            filtered = filtered.filter(item => item.status === filter.status);
        }
        
        // Phân trang thủ công
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        filtered = filtered.slice(startIndex, endIndex);
        
        setFilteredTransactions(filtered);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleFilterChange = (type: string, value: string) => {
        setFilter(prev => ({
            ...prev,
            [type]: value
        }));
        // Reset về trang đầu tiên khi thay đổi bộ lọc
        setCurrentPage(1);
    }
    
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'completed':
                return 'bg-green-500';
            case 'pending':
                return 'bg-yellow-500';
            case 'failed':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    }

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'deposit':
                return '💵';
            case 'purchase':
                return '💰';
            case 'withdraw':
                return '💸';
            default:
                return '🔄';
        }
    }
    
    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'deposit':
                return 'Nạp tiền';
            case 'purchase':
                return 'Mua';
            case 'withdraw':
                return 'Rút tiền';
            default:
                return type;
        }
    }

    // Hiển thị trạng thái loading
    if (loading && !error) {
        return (
            <div className="mb-10 min-h-[300px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Hiển thị thông báo lỗi
    if (error) {
        return (
            <div className="mb-10 min-h-[300px] flex flex-col items-center justify-center">
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-6 py-4 rounded-lg max-w-xl text-center">
                    <p className="text-lg mb-4">{error}</p>
                    <div className="flex gap-4 justify-center">
                        <button 
                            onClick={() => router.push('/login')} 
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                        >
                            Đăng nhập
                        </button>
                        <button 
                            onClick={() => router.push('/')} 
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
                        >
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (  
        <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-white text-[1.65rem] flex items-center mb-4 md:mb-0">Lịch sử giao dịch</h2>
                <div className="flex flex-wrap gap-2">
                    <select 
                        className="bg-[#1e2c43] text-white px-3 py-2 rounded-md"
                        value={filter.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                        <option value="all">Tất cả loại</option>
                        <option value="deposit">Nạp tiền</option>
                        <option value="purchase">Mua</option>
                        <option value="withdraw">Rút tiền</option>
                    </select>
                    <select 
                        className="bg-[#1e2c43] text-white px-3 py-2 rounded-md"
                        value={filter.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="pending">Đang xử lý</option>
                        <option value="failed">Thất bại</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#101827] rounded-xl overflow-hidden">
                {filteredTransactions && filteredTransactions.length > 0 ? (
                    <>
                        <div className="hidden md:grid grid-cols-12 bg-[#1e2c43] p-4 font-semibold text-[#c6cacf]">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-2">Loại</div>
                            <div className="col-span-3">Mô tả</div>
                            <div className="col-span-2">Số tiền</div>
                            <div className="col-span-2">Thời gian</div>
                            <div className="col-span-2">Trạng thái</div>
                        </div>
                        
                        {filteredTransactions.map((item, index) => (
                            <div key={item.id} className={`${index % 2 === 0 ? 'bg-opacity-10' : ''} hover:bg-[#1e2c43] transition-all duration-300`}>
                                <div className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 md:gap-0">
                                    <div className="hidden md:flex col-span-1 items-center justify-center">
                                        <span className="font-mono">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                                    </div>
                                    
                                    <div className="flex items-center col-span-2 gap-2">
                                        <span className="text-xl">{getTypeIcon(item.type)}</span>
                                        <span className="capitalize">{getTypeLabel(item.type)}</span>
                                    </div>
                                    
                                    <div className="col-span-3">
                                        <p className="line-clamp-2 text-[#c6cacf]">
                                            {item.description || `Giao dịch #${item.id}`}
                                        </p>
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <span
                                            className="font-semibold"
                                            style={{ color: item.type === 'withdraw' || item.type === 'purchase' ? 'red' : 'green' }}
                                        >
                                            {item.type === 'withdraw' || item.type === 'purchase' ? '-' : '+'}{parseFloat(item.amount).toLocaleString()} đ
                                        </span>
                                    </div>

                                                                        
                                    <div className="col-span-2 text-[#747c88]">
                                        {difference(item.created_at)}
                                    </div>
                                    
                                    <div className="col-span-2">
                                        <span className={`px-2 py-1 rounded-full text-sm text-white ${getStatusColor(item.status)}`}>
                                            {item.status === 'completed' ? 'Hoàn thành' : 
                                            item.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-lg text-[#747c88]">Không có giao dịch nào</p>
                    </div>
                )}
            </div>
            
            {totalPages > 1 && (
                <div className="mt-6">
                    <PaginateComic 
                        currentPage={currentPage} 
                        totalPage={totalPages}
                        onPageChangeCustom={handlePageChange} 
                    />
                </div>
            )}
        </div>
    );
}

export default Page;
