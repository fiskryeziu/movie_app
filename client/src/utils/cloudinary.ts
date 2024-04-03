import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: 'dkujpxuwa',
    api_key: '763511446693441',
    api_secret: 'vCoQvyVDpAHO8dDLpbF3XF4Nbxc'
})

export async function handleDelete(url: string) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split(".")[0];
    try {
        const res = await cloudinary.v2.uploader.destroy(publicId, {
            resource_type: 'image',
            type: 'upload'
        });
        console.log(res);
        return res
    } catch (err) {
        console.log("Something went wrong, please try again later.");
    }
}

