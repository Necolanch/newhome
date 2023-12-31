import { IAPIGateway } from "./IAPIGateway";

export class APIGateway implements IAPIGateway {
    public async Get<T>(path: string): Promise<T> {

        return await fetch(path, {
            credentials: "include",
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => data)
    }

    public async Login(path: string, requestBody: { name: string, email: string }): Promise<any> {

        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const emailTest = re.test(requestBody.email);
        if (requestBody.name === (undefined || null || "")) {
            return { message: "Please enter your name" }
        } else if (emailTest === false) {
            return { message: "Please enter a valid email" }
        } else {
            return fetch(path, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => response)
        }
    }

    public async Post(path: string, requestBody: {}): Promise<any> {

        return fetch(path, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response)

    }

    public async PostNoBody(path: string) {
        return fetch(path, {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => data);
    };
}