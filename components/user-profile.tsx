"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

const UserProfile = () => {
  const { user, loading, error, fetchUserProfile } = useUserStore();

  useEffect(() => {
    // Fetch the user profile when the component is mounted
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;
