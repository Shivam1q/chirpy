import { config } from "../../config.js";
import { deleteAllUser } from "../../db/queries/users.js";
export const handleResetConfig = async (req, res) => {
    config.api.fileserverHits = 0;
    if (config.api.platform !== "dev") {
        res.status(403).json({ data: "Forbidden" });
    }
    ;
    const response = await deleteAllUser();
    res.status(200).json({ data: response, msg: "Server hits are set to 0 and all users are deleted" });
};
