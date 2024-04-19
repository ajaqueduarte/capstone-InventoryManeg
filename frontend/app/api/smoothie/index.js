import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const baseUrl = `http://127.0.0.1:8000/foods/`;

    try {
      const response = await fetch(baseUrl);
      

      if (!response.ok) {
        throw new Error('Failed to fetch food items');
      }

      const data = await response.json();
      console.log(data);
      return NextResponse.json(data, { status: response.status }); // Use NextResponse to send response
    } catch (error) {
      console.error('Error fetching food items:', error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 }); // Use NextResponse to send error response
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const baseUrl = `http://127.0.0.1:8000/foods/${id}`;

    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status }); // Use NextResponse to send response
    } catch (error) {
      console.error('Error updating food item:', error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 }); // Use NextResponse to send error response
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const baseUrl = `http://127.0.0.1:8000/foods/${id}`;

    try {
      const response = await fetch(baseUrl, {
        method: 'DELETE',
      });

      const data = await response.json();
      return NextResponse.json(data, { status: response.status }); // Use NextResponse to send response
    } catch (error) {
      console.error('Error deleting food item:', error);
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 }); // Use NextResponse to send error response
    }
  } else {
    // Method Not Allowed
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 }); // Use NextResponse to send method not allowed response
  }
}
