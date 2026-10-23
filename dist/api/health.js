export const handlerReadiness = (req, res) => {
    res
        .header("Content-Type", "text/plain; charset=utf-8")
        .status(200)
        .send("OK");
};
