import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const latestPrompt = await Prompt.findOne({
            creator:params.id
        })
            .populate('creator');
        
        return new Response(JSON.stringify(latestPrompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching and deleting prompts:", error);
        return new Response("Failed to fetch and delete prompts", { status: 500 });
    }
}
