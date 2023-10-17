import {create} from 'zustand';

interface ProModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useProModal = create<ProModalState>((set) => ({
    isOpen: false,
    openModal: () => {set({isOpen: true})},
    closeModal: () => set({isOpen: false}),
}));