const imgUpload = (req, res, next) => {
    console.log("Reached img upload");
    try {
         
    } catch (error) {
        next(error);
    }
}
module.exports = imgUpload;