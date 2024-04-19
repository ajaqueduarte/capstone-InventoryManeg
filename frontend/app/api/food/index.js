import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const baseUrl = `http://127.0.0.1:8000/foods/`;

    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      console.log(data);
      return NextResponse.json(data); // Use NextResponse to send response
    } catch (error) {
      console.error('Error fetching food items:', error);
      return res.status(500).json({ message: 'Something went wrong' }); // Set status code before sending error response
    }
  } else {
    // Method Not Allowed
    return res.status(405).json({ message: 'Method Not Allowed' }); // Set status code before sending method not allowed response
  }
}
