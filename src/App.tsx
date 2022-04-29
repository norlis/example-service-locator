import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import LoginPage from "./presentation/containers/login";
import Layout from "./presentation/components/layout";
import HomePage from "./presentation/containers/home";
import RequireAuth from "./presentation/components/requiere-auth";
import AuthProvider from "./presentation/providers/auth-provider";
import RequestInterceptor from "./presentation/containers/request-interceptor";

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <RequestInterceptor>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route element={<Layout/>}>
                            <Route path="/" element={
                                <RequireAuth>
                                    <HomePage/>
                                </RequireAuth>
                            }
                            />
                        </Route>
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                </RequestInterceptor>
            </div>
        </AuthProvider>
    );
}

export default App;
