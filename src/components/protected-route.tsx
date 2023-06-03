import React from 'react'
import { Navigate } from 'react-router-dom';


interface Props {
  children: JSX.Element;
}

export function setTokenToStorage(userToken: any) {
  localStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken() {
  const tokenString = localStorage.getItem('token') || "";
  return tokenString;
}

function useAuth() {
  return getToken() !== '';
}

export const ProtectedRoute = ({ children } : Props) => {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};