import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        // Fetch the latest prompt
        const latestPrompt = await Prompt.find({}).populate('creator');

        console.log("Latest Prompt:", latestPrompt);

        if (!latestPrompt) {
            return new Response("No prompts found", { status: 404 });
        }

        return new Response(JSON.stringify(latestPrompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching and deleting prompts:", error);
        return new Response("Failed to fetch and delete prompts", { status: 500 });
    }
}
