import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useWrapperStore = (
    slug: string,
    cashSlug: string,
    taskStore: (item: any)=>void,
    taskFind: (name: string)=>any|null,
    isEmptyStore?: () => boolean,
) => {
    const router = useRouter()
    const { query } = router;
    const cash = useRef(cashSlug);
    useEffect(() => {
        if((query[slug] && cash.current !== query[slug]) || isEmptyStore?.() || false){
            const item = taskFind(query[slug] as string);
            if(item){
                taskStore(item);
                cash.current = query[slug] as string;
            }
        }
    }, [query])
}

export default useWrapperStore;