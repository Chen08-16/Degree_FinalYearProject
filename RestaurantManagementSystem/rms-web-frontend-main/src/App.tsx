import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ThemedLayoutV2, ThemedTitleV2, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp, Layout, Table } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Login } from "./pages/login";
import { resources } from "./config/resources";
import { Register } from "./pages/register";
import { Header } from "./components";
import { ForgotPassword } from "./pages/forgotPassword";
import { Profile } from "./pages/Profile";
import { Reservation } from "./pages/Reservation";
import { Chat } from "./pages/Chat";
import { Feedback } from "./pages/Feedback";
import { Order } from "./pages/Order";
import { FAQ } from "./pages/FAQ";

function App() {
    return (
        <BrowserRouter>
        
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <AntdApp>

                        <Refine
                          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                          notificationProvider={useNotificationProvider}
                          routerProvider={routerBindings}
                          authProvider={authProvider}
                          resources={resources}   //sidebar menu links
                          options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            projectId: "p8s63R-QYg4Rl-ALoXIU",
                          }}
                        >
                            <Routes>

                                <Route path="/login" index element={<Login />} /> 

                                {/* Protecting Route */}
                                <Route element={
                                        <Authenticated key="authenticated-layout" fallback={<Login />} redirectOnFail="/login">
                                            <ThemedLayoutV2  
                                                Title={(props) => (
                                                    <ThemedTitleV2 {...props} text="Restaurant Mangement System" />
                                                )}

                                                // Header={() => (
                                                //     <CustomHeader/>
                                                // )}
                                                Header={() => (
                                                    <Header/>
                                                )}

                                                Footer={() => (
                                                    <Layout.Footer
                                                        style={{
                                                        textAlign: "center",
                                                        // color: "#fff",
                                                        // backgroundColor: "#7dbcea",
                                                        }}
                                                    >
                                                        @2025 RMS-Web Developed by Tung Jun Ting
                                                    </Layout.Footer>
                                                )}
                                            >
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        </Authenticated>    
                                    }>
                                        
                                        <Route path="/" index element={<Home />} />
                                        <Route path="/Menu" index element={<Menu />} /> 
                                        <Route path="/Order" index element={<Order />} />  
                                        <Route path="/Reservation" index element={<Reservation />} />  
                                        <Route path="/Feedback" index element={<Feedback />} /> 
                                        <Route path="/Chat" index element={<Chat />} /> 
                                        <Route path="/FAQ" index element={<FAQ />} /> 
                                        <Route path="/Profile" index element={<Profile />} />   
            
                                    </Route>

                                    <Route path="/forgot-password" element={<ForgotPassword/>} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />


                            </Routes>
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </AntdApp>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
