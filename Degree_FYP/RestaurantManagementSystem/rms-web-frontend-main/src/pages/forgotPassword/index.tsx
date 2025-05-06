import { getAuth } from 'firebase/auth';
import { AuthPage } from "@refinedev/antd";
import { Navigate } from 'react-router-dom';
import { AuthProvider, useForgotPassword } from "@refinedev/core";

const auth = await getAuth()

export const ForgotPassword = () => {
    const {mutate:forgotPassword } = useForgotPassword()
    if(auth?.currentUser){
        return <Navigate to="/update-password" replace />;
    }

    return (
        <AuthPage type="forgotPassword" 
            formProps={{
                onFinish: (values:any) => {
                    console.log("Form Values:", values); // Debug here
                    forgotPassword({ email: values.email });
                },
            }}

        />
    )
}