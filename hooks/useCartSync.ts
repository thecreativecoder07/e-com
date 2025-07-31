import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveCartToLocalStorage } from "@/utils/localstorage";

export const useCartSync = () => {
    const userCart = useSelector((state: RootState) => state.cart.userCart);

    useEffect(() => {
        saveCartToLocalStorage(userCart);
    }, [userCart]);
};
