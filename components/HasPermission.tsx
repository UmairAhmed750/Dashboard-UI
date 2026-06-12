"use client";

import React from "react";

// 👑 STRICT ROLE MATRIX
const ROLE_PERMISSIONS = {
  owner: ["view_dashboard", "edit_post", "delete_post","view_post"], // Owner sab kar sakta hai
  editor: ["view_dashboard", "edit_post","view_post"],               // Editor delete nahi kar sakta (delete_post missing hai)
  buyer: ["view_dashboard", "view_post"],              // Buyer sirf dekh sakta hai
  "": ["view_dashboard"],
};

type Role = "owner" | "editor" | "buyer" | "";

interface HasPermissionProps {
  userRole: Role;          
  permission: string;      
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
}

export default function HasPermission({
  userRole,
  permission,
  children,
  fallback = null,
}: HasPermissionProps) {
  
  // 🚨 Strict Normalization: Role ko lowercase karke check karein
  const sanitizedRole = (userRole?.toLowerCase() || "") as Role;
  
  const permissions = ROLE_PERMISSIONS[sanitizedRole] || [];
  const hasAccess = permissions.includes(permission);

  // Agar user ke paas exact permission nahi hai, toh chup-chap block karo
  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}