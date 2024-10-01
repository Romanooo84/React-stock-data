import { Navigate } from 'react-router-dom';
import { useData } from "hooks/dataContext";

const CheckRoute = ({ element: Component, redirectTo = '/' }) => {
    const {Data} = useData();
    if (!Data.historicalData || Data.historicalData.length===0) {
        return <Navigate to={redirectTo} />;
    }
    return Component;
};

export default CheckRoute;