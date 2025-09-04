import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const signUp = async (email: string, name: string, password: string) => {
    try {
      setLoading(true);
      await axios.post(`/api/auth/signup`, {
        email,
        name,
        password,
      });

      const res = await signIn("credentials", {
        redirect: true,
        email,
        password,
        callbackUrl: '/home'
      });

      if (res?.error) {
        setError("wrong details");
      } 
    } catch (error) {
      console.error(error);
      setError("error signing up!! check details");
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    loading,
    error,
  };
};
