import { create } from 'zustand';

interface CustomerStore {
	searchQuery: string;
	cities: string[];
	setSearchQuery: (query: string) => void;
	setCities: (cities: string[]) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
	searchQuery: '',
	cities: [],
	setSearchQuery: (query) => set(() => ({ searchQuery: query })),
	setCities: (cities) => set(() => ({ cities })),
}));

export default useCustomerStore;
