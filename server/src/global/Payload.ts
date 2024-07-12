import { QueryResult } from "mysql2";
import { QueryRes } from "../QueryRes";

function createPayload(res: QueryResult): QueryRes {

    return {data: res}
}

export default createPayload