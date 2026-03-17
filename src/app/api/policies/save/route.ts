import { NextResponse } from "next/server";
import { supabaseServerService } from "@/lib/supabaseServer";

export async function POST(req:Request){

const body = await req.json();

const supabase = supabaseServerService();

const { data,error } = await supabase
.from("policies")
.insert({
venue_id:body.venueId,
name:body.name,
rules:body.rules,
active:true
})
.select()
.single();

if(error)
return NextResponse.json({ok:false,error:error.message});

return NextResponse.json({ok:true,policy:data});

}
