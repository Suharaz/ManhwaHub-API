/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { FaFilter, FaSearch } from "react-icons/fa";
import DropdownFilter from "./DropDown/Filter";
import { useEffect, useState } from "react";
import { CategoryProp } from "@/types/ComicProp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";

function HeaderFilter({categories, setData}: {categories: CategoryProp[], setData?: any}) {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [keyword, setKeyword] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [selectedMinChap, setSelectedMinChap] = useState<string[]>([]);
    const [selectedSort, setSelectedSort] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    useEffect(() => {
        setActiveDropdown(null);
        const keyword = searchParams.get('keyword');
        const categories = searchParams.get('categories');
        const status = searchParams.get('status');
        const minChap = searchParams.get('minChap');
        const sort = searchParams.get('sort');
        const country = searchParams.get('country');
        const page = searchParams.get('page');
        if (categories) {
            setSelectedCategories(categories.split(','));
        }
        if (status) {
            setSelectedStatus(status.split(','));
        }
        if (minChap) {
            setSelectedMinChap([minChap]);
        }
        if (sort) {
            setSelectedSort([sort]);
        }
        if (country) {
            setSelectedCountry(country.split(','));
        }
        const fetchData = async () => {
            if(setData) {
                axios.get('/baseapi/comics/filterComic',{
                    params: {
                        keyword: keyword,
                        categories: categories,
                        status: status,
                        minChap: minChap,
                        sort: sort,
                        country: country,
                        page: page ? page : 1
                    }
                }).then((res) => {
                    setData(res.data.comics);
                }).catch(() => {
                    setData([]);
                });
            };
        };
        fetchData();
    }, [searchParams]);

    const optionMinChap = [
        { id: '1', name: '>= 1 chapters' },
        { id: '3', name: '>= 3 chapters' },
        { id: '5', name: '>= 5 chapters' },
        { id: '10', name: '>= 10 chapters' },
        { id: '20', name: '>= 20 chapters' },
        { id: '30', name: '>= 30 chapters' },
        { id: '50', name: '>= 50 chapters' }
    ];

    const optionSort = [
        { id: 'latest', name: 'Mới nhất' },
        { id: 'oldest', name: 'Cũ nhất' },
        { id: 'rating', name: 'Đánh giá' },
        { id: 'alphabet', name: 'A-Z' },
        {id: 'recently_updated', name: 'Mới cập nhật'},
        {id: 'mostView', name: 'Xem nhiều nhất'}
    ];

    const optionStatus = [
        { id: '1', name: 'Hoàn thành' },
        { id: '0', name: 'Đang tiến hành' }
    ];

    const optionCountry = [
        {id: 'manga', name: 'Nhật Bản'},
        {id: 'manhua', name: 'Trung Quốc'},
        {id: 'manhwa', name: 'Hàn Quốc'},
        {id: 'other', name: 'Khác'}
    ];

    const optionCategories = categories.map((category) => {
        return {id: String(category.id), name: category.name};
    });

    const handleSearch = () => {
        const query = {
          keyword,
          categories: selectedCategories.join(','),
          status: selectedStatus.join(','),
          minChap: selectedMinChap.join(','),
          sort: selectedSort.join(','),
          country: selectedCountry.join(','),
        };
        const queryString = new URLSearchParams(query).toString();
        router.push(`/tim-kiem-nang-cao?${queryString}`);
    };

    const handleToggleDropdown = (dropdownName: string) => {
        if (activeDropdown === dropdownName) {
          setActiveDropdown(null);
        } else {
          setActiveDropdown(dropdownName);
        }
    };

    return (  
        <div className="mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                <div className="flex items-center relative">
                    <input 
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)} 
                        type="text" 
                        name="keyword" 
                        placeholder="Tìm kiếm..." 
                        autoComplete="off"
                        className="bg-[#182335] rounded-lg border border-[#1e2c43] h-[2.6rem] block w-full px-3 py-[.475rem] text-[1rem] font-normal leading-[1.5] text-white focus:outline-none" 
                    />
                    <FaSearch className="absolute right-[1rem] text-[#747c88]" />
                </div>
                <DropdownFilter 
                    options={optionCategories} 
                    title="Thể loại" 
                    onChange={setSelectedCategories} 
                    onToggle={() => handleToggleDropdown('categories')}
                    isActive={activeDropdown === 'categories'}
                    selectedItems={selectedCategories}
                />
                <DropdownFilter
                    options={optionStatus} 
                    title="Trạng thái" 
                    onChange={setSelectedStatus} 
                    onToggle={() => handleToggleDropdown('status')}
                    isActive={activeDropdown === 'status'}
                    selectedItems={selectedStatus}
                />
                <DropdownFilter 
                    options={optionMinChap} 
                    title="Độ dài" 
                    multi={false} 
                    onChange={setSelectedMinChap} 
                    onToggle={() => handleToggleDropdown('minChap')}
                    isActive={activeDropdown === 'minChap'}
                    selectedItems={selectedMinChap}
                />
                <DropdownFilter 
                    options={optionSort} 
                    title="Sắp xếp" 
                    multi={false} 
                    onChange={setSelectedSort} 
                    onToggle={() => handleToggleDropdown('sort')}
                    isActive={activeDropdown === 'sort'}
                    selectedItems={selectedSort}
                    />
                <DropdownFilter 
                    options={optionCountry} 
                    title="Quốc gia" 
                    onChange={setSelectedCountry} 
                    onToggle={() => handleToggleDropdown('country')}
                    isActive={activeDropdown === 'country'}
                    selectedItems={selectedCountry}
                />
                <div>
                    <button
                        onClick={handleSearch}
                        aria-label="Filter" 
                        type="button" 
                        className="flex duration-300 items-center uppercase tracking-[.2rem] border border-btnHover rounded-lg w-full overflow-hidden whitespace-nowrap text-ellipsis h-[2.6rem] justify-center px-[.8rem] hover:bg-[#5a9dcf] hover:text-white bg-[#3c8bc6] text-white font-normal text-center select-none text-[1rem] leading-[1.5] transition-all">
                        <FaFilter className="mr-2" />
                        <span>Lọc</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeaderFilter;