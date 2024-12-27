import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useErrors = () => {
  return useContext(ErrorContext);
};

import PropTypes from 'prop-types';

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    const addError = (error) => {
        setErrors(prevErrors => {
            if (prevErrors.includes(error)) {
                return prevErrors;
            }
            return [...prevErrors, error];
        });
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const value = {
        errors,
        addError,
        clearErrors
    };

    return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};

ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


ErrorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
