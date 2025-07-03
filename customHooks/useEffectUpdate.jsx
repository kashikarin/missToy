import { useRef, useEffect } from "react";

export function useEffectUpdate(cb, dependencies) {
    const isFirstRenderRef = useRef(true)
    useEffect(()=>{
        if (isFirstRenderRef.current){
                isFirstRenderRef.current = false
                return
            }
        return cb()
    }, dependencies)    
}