"use client";

import React from "react";
import  { useState,useEffect } from "react";
type RolesProps = {
  selectedRole: string;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
};

export default function Roles({ selectedRole, setSelectedRole }: RolesProps) {
  const roles = ["SDE", "SWE", "Backend", "Frontend", "ML", "Data Analyst"];

  

  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {roles.map((role) => {
        const isSelected = selectedRole === role;

        return (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 text-sm font-medium rounded-full border cursor-pointer transition-colors ${
              isSelected
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
}