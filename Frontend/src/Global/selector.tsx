import { selector } from "recoil";
import axios from 'axios';


// Define a Recoil selector that holds your function
export const handleDeleteSelector = selector({
  key: "handleDeleteSelector",
  get: ({ get }) => {
    return async (id: number) => {
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
  },
});

export const onEditSelector = selector({
  key: "onEditSelector",
  get: ({ get }) => {
    return (id: number) => {
      console.log(`Editing item with id: ${id}`);
    };
  },
});