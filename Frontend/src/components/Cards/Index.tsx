// src/components/CardHoverEffectDemo.tsx
"use client";
import { HoverEffect } from "./HoverCards";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import axios from 'axios';


export interface Account {
  id: number;
  name: string;
  username: string;
  password: string;
  website_link: string;
}

export function  CardHoverEffectDemo() {
  const { token, data, error, loading } = useFetch<Account[]>("http://localhost:8080/your-accounts");
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (data) {
      setAccounts(data.map((account) => ({
        id: account.id,
        name: account.name,
        username: account.username,
        password: account.password,
        website_link: account.website_link
      })));
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/delete-account/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
          }
      });
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const onEdit = async(id: number)=>{
    console.log(id)
  }

  if (error) {
    return (
      <div>
        {error.message}
      </div>
    );
  }

  if (loading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return <HoverEffect items={accounts} handleDelete={handleDelete} />;
}