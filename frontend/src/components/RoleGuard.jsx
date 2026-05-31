import React from 'react';
import { useSelector } from 'react-redux';

const RoleGuard = ({ children, allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
};

export default RoleGuard;
