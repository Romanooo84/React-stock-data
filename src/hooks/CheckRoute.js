import { Navigate } from 'react-router-dom';
import { useData } from "hooks/dataContext";

const CheckRoute = ({ element: Component, redirectTo = '/' }) => {
    const {Data} = useData();
    console.log(Data)
    if (!Data.historicalData) {
        console.log("Redirecting to:", redirectTo);
        return <Navigate to={redirectTo} />;
    }
    return Component;
};

export default CheckRoute;