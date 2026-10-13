import React, { createContext, Fragment, ReactNode, useContext, useState } from "react";

// Define context types
interface PopupContextType {
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
	isModalOpen: boolean;
}

// Create Popup Context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Custom hook to use popup context
export const usePopup = () => {
	const context = useContext(PopupContext);
	if (!context) {
		throw new Error("usePopup must be used within a PopupProvider");
	}
	return context;
};

// Popup Provider Component
export const PopupProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [popupContent, setPopupContent] = useState<ReactNode>(null);
	const [popupKey, setPopupKey] = useState(0);


	const openModal = (content: ReactNode) => {
		setPopupKey((k) => k + 1);
		setPopupContent(content);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<PopupContext.Provider
			value={{
				openModal,
				closeModal,
				isModalOpen,
			}}
		>
			{children}
			<Fragment key={popupKey}>{popupContent}</Fragment>
		</PopupContext.Provider>
	);
};