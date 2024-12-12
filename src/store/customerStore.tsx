import { create } from 'zustand';

interface CustomerStore {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
	searchQuery: '',
	setSearchQuery: (query) => set(() => ({ searchQuery: query })),
}));

export default useCustomerStore;
