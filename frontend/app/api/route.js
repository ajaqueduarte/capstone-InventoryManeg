    import {NextResponse} from "next/server";
    export async function POST(req) {
        const baseUrl = `http://127.0.0.1:8000/forecast`;

        const body = await req.json();
        try {
            const response = await fetch(`${baseUrl}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return NextResponse.json(data);
        } catch (e) {
            return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        }
    }
