import { BASE_URL } from "@env";
import axios from "axios";
import { getAccessToken } from "../utils/auth";

interface PromptData {
  prompt: string;
  previousPrompt?: string; // For storing incomplete prompts
}

export const createTaskFromPrompt = async (promptData: PromptData) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.post(
      `${BASE_URL}/v1/tasks/prompts/`,
      {
        prompt: promptData.prompt,
        previous_prompt: promptData.previousPrompt // Include previous prompt if exists
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific error cases
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw error;
  }
}; 