'use server'
import client from "@/sanity/lib/client";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/authOptions";

export async function toggleHeart(slug: string, email: string): Promise<void> {
    try {
        // Fetch the user document based on the email
        const userQuery = `*[_type == "user" && email == $email][0]`;
        const userDocument = await client.fetch(userQuery, { email });

        if (userDocument) {
            const currentFavorites = userDocument.favorites || [];
            const slugIndex = currentFavorites.indexOf(slug);

            let updatedFavorites;
            if (slugIndex === -1) {
                // Add the slug if it's not already in favorites
                updatedFavorites = [...currentFavorites, slug];
                console.log(`Slug ${slug} added to favorites.`);
            } else {
                // Remove the slug if it already exists (toggle behavior)
                updatedFavorites = currentFavorites.filter((fav: string) => fav !== slug);
                console.log(`Slug ${slug} removed from favorites.`);
            }

            // Patch the user document with the updated favorites
            await client
                .patch(userDocument._id)
                .set({ favorites: updatedFavorites })
                .commit();

            console.log(`Favorites updated for user ID: ${userDocument._id}`);
        } else {
            console.log(`User with email ${email} not found.`);
        }
    } catch (error) {
        console.log("Error toggling favorite:", error);
    }
}

export const saveProfile = async (e: FormData) => {
    const session = await getServerSession(authOption);
    const { name, image } = { name: e.get('name'), image: e.get('image') };
    try {
        if (!session) return;
        const user = await client.fetch(`*[_type == "user" && email == $email][0]`, { email: session?.user?.email })
        if (user) {
            await client
                .patch(user._id)
                .set({ name, image })
                .commit();
            console.log('Updated Profile!');
        } else {
            console.log('User not Found!');
        }
    } catch (error) {
        console.log('Failed to updated profile!', error);
    }
}