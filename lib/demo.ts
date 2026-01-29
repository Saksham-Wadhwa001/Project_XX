import {getOrderDetails} from "@/test_db";
import {connectDB} from "@/lib/mongodb";

async function main(){
    await connectDB();
    const o = await getOrderDetails("aa95fd59-85a6-40bf-bf74-79735ae70ba4");
    console.log(o);
}
main().catch(console.error);