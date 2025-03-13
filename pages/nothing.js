import result from "@/app/actions/result"
import { useEffect } from "react"


export default function Nothing(){
    useEffect(()=>{
        result("id");
    },[])
    return (
        <h1>Danh cen  t</h1>
    )
}