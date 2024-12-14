import { create } from 'zustand';

interface CustomerStore {
	searchQuery: string;
	cities: string[];
	selectedCity: string;
	setSearchQuery: (query: string) => void;
	setCities: (cities: string[]) => void;
	setSelectedCity: (city: string) => void;
	highlightOldest: boolean;
	setHighlightOldest: (highlight: boolean) => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
	searchQuery: '',
	cities: [],
	selectedCity: '',
	setSearchQuery: (query) => set(() => ({ searchQuery: query })),
	setCities: (cities) => set(() => ({ cities })),
	setSelectedCity: (city) => set(() => ({ selectedCity: city })),
	highlightOldest: false,
	setHighlightOldest: (value) => set(() => ({ highlightOldest: value })),
}));

export default useCustomerStore;
