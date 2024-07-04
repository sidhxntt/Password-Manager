"use client";
import { HoverEffect } from "./Cards";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";


interface Account {
  name: string;
  username: string;
  password: string;
  websiteLink: string;
}

export function CardHoverEffectDemo() {
  const { data, error, loading } = useFetch<Account[]>("http://localhost:8080/your-accounts");
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (data) {
      setAccounts(data.map(account => ({
        name: account.name,
        username: account.username,
        password: account.password,
        websiteLink: account.websiteLink
      })));
    }
  }, [data]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return <HoverEffect items={accounts} />;
}
