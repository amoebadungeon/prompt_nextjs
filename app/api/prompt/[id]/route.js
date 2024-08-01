//GET (read)
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const latestPrompt = await Prompt.findById(
            params.id
        ).populate('creator');
        
        if(!latestPrompt) return  new Response("Failed to find prompts", { status: 404 });

        return new Response(JSON.stringify(latestPrompt), { status: 200 });
    } catch (error) {
        console.error("Error GET  prompts:", error);
        return new Response("Failed to fetch prompts", { status: 500 });
    }
}

// PATCH (UPDATE)
export const PATCH = async ( request, {params} ) => {
    const { prompt , tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        console.log("barua",existingPrompt)
        if(!existingPrompt) return  new Response("Prompts not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error("Error PATCH prompts:", error);
        return new Response("Failed to update prompts", { status: 500 });
    }

}

//DELETE
export const DELETE = async ( request, {params} ) =>{
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt delete sucessfully",{status:200})
    } catch (error) {
        console.error("Error  deleting prompts:", error);
        return new Response("Failed to fetch and delete prompts", { status: 500 });
    }
}