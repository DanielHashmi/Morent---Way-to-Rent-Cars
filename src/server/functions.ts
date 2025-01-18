import client from "@/sanity/lib/client";

export async function toggleHeart(slug: string): Promise<void> {
    try {
        // Fetch the document based on the slug
        const query = `*[_type == "car" && slug.current == $slug][0]`;
        const document = await client.fetch(query, { slug });

        if (document) {
            // Toggle the heart field
            const updatedHeart = !document.heart;
            await client
                .patch(document._id) // Use the document's `_id` for the patch
                .set({ heart: updatedHeart })
                .commit();

            console.log(`Heart toggled to ${updatedHeart} for document ID: ${document._id}`);
        } else {
            console.error(`Document with slug ${slug} not found.`);
        }
    } catch (error) {
        console.error("Error toggling heart:", error);
    }
}
