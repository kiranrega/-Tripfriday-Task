import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserIdContext = createContext();

// Create a provider component
export const UserIdProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserIdContext.Provider>
    );
};

// Custom hook to consume the context
export const useUserId = () => useContext(UserIdContext);
