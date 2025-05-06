import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Typography, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import R_Wallpaper_2 from "../../images/R_Wallpaper_2.jpg";

const { Title, Text } = Typography;

export const Login = () => {
    const { mutate: login, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        login({ providerName: "google" });
    };

    const onFinish = (values) => {
        login(values);
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    return (
        <div
            style={{
                backgroundImage: `url(${R_Wallpaper_2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "20px",
            }}
        >
            {/* Panel for Title */}
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                <Title level={1} style={{ color: "white", margin: 0 }}>
                    Restaurant Management System
                </Title>
            </div>

            {/* Login Form Panel */}
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    padding: "30px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <Title level={2} style={{ textAlign: "center", color: "#fff", marginBottom: "20px" }}>
                    Welcome Back!
                </Title>
                <Text style={{ display: "block", marginBottom: "20px", textAlign: "center", color: "#aaa" }}>
                    Please sign in to continue to the Restaurant Management System.
                </Text>

                {/* Google Login Button */}
                <Button
                    type="primary"
                    icon={<GoogleOutlined />}
                    block
                    onClick={handleGoogleLogin}
                    style={{ marginBottom: "20px", backgroundColor: "#4285F4", borderColor: "#4285F4" }}
                >
                    Sign in with Google
                </Button>

                <Divider style={{ borderColor: "#aaa" }}>OR</Divider>

                {/* Email/Password Login Form */}
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={<Text style={{ color: "#fff" }}>Email Address</Text>}
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<Text style={{ color: "#fff" }}>Password</Text>}
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                        style={{ marginTop: "20px" }}
                    >
                        Sign In
                    </Button>
                </Form>

                {/* Forgot Password Link */}
                <Text
                    style={{
                        display: "block",
                        marginTop: "30px",
                        textAlign: "center",
                        color: "#fff",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                    onClick={handleForgotPassword}
                >
                    Forgot your password?
                </Text>

                {/* Sign Up Link */}
                <Text
                    style={{
                        display: "block",
                        marginTop: "10px",
                        textAlign: "center",
                        color: "#fff",
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                    onClick={handleSignUp}
                >
                    Don't have an account? Sign up
                </Text>
            </div>
        </div>
    );
};
