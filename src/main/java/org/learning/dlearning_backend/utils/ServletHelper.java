package org.learning.dlearning_backend.utils;


import jakarta.servlet.http.HttpServletRequest;

public class ServletHelper {
    private ServletHelper(){}
    public static String extractIPAddress(HttpServletRequest request ) {
        String ipAdress;
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        return ipAdress;
    }
}
