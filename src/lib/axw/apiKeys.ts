import crypto from "crypto";
import { supabaseServerService } from "@/lib/supabaseServer";

export async function createApiKey(name:string){

const raw=`axw_${crypto.randomBytes(20).toString("hex")}`;
const hash=crypto.createHash("sha256").update(raw).digest("hex");

const supabase=supabaseServerService();

const {data,error}=await supabase
.from("api_keys")
.insert({
name,
key_prefix:raw.slice(0,12),
key_hash:hash
})
.select()
.single();

if(error)
return {ok:false,error:error.message};

return {ok:true,key:raw,record:data};

}
