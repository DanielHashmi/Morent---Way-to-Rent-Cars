import client from "@/sanity/lib/client"

export async function toggleHeart(documentId: string): Promise<void> {
    try {
        const document = await client.getDocument(documentId);
        if (document) {
            const updatedHeart = !document.heart;
            await client.patch(documentId)
                .set({ heart: updatedHeart })
                .commit();
            console.log(`Heart toggled to ${updatedHeart} for document ID: ${documentId}`);
        } else {
            console.error(`Document with ID ${documentId} not found.`);
        }
    } catch (error) {
        console.error('Error toggling heart:', error);
    }
}