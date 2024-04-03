import cloudinary from 'cloudinary'

cloudinary.v2.config({
    cloud_name: import.meta.env.VITE_CLOUD_NAME,
    api_key: import.meta.env.VITE_CLOUD_KEY,
    api_secret: import.meta.env.VITE_CLOUD_KEY_SECRET
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

