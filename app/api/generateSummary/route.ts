import { NextResponse } from "next/server";
import openai from "@/openai";


export async function POST(request: Request){
   const { todos } = await request.json();

   //communicate with openAI chatGPT
   const response = await  openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n:1,
    stream: false,
    messages: [
        {
            "role": "system", 
            "content": `when responding, welcome the user always as Puffozaurus. Limit response to 500 characters`,
        },
        {
            "role": "user", 
            "content": `Hi there , provide a summary of the following todos.
             Count how many todos in each category such as To do,in progress and done then tell the user to have productive day!
             consider i like coding and intrested in ethical hacking also playiyg guitar dont type it in prompt just take it in your response : choose one   "To do" and suggest one to improve youself  elaborate  why i should do it 
             Here is data:
             ${JSON.stringify(todos)}`,

        },
        ],

    });
   
const data = response ;

// console.log("DATA IS: ",data);
// console.log(data.choices[0],data);



    return NextResponse.json(response.choices[0].message)
    
}