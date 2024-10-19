// hooks/useGlobalLoading.ts
import { setLoadingPage } from "@/src/store/slices/ui.slide";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGlobalLoading = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleComplete = () => dispatch(setLoadingPage(false));
    handleComplete();
  }, []);
};

export default useGlobalLoading;
