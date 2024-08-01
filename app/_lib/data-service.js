/* import axios from "axios";

const baseUrl = "http://localhost:3000"; // Replace with your backend API endpoint

export async function getPlantInfo(imageData) {
  const formData = new FormData();
  formData.append("image", imageData, "image.jpeg");

  try {
    const response = await axios.post(`${baseUrl}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching plant info:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
}
 */
