import jwtDecode from "jwt-decode";

export const DecodeJWTToken = (token) => {
  
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
   
  } catch (error) {
    console.error('Error while decoding JWT token:', error);
    return null;
  }
};