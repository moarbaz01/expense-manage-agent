import Groq from "groq-sdk";
import dotenv from "dotenv";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const expenseDB = [];
let salary = 0;

async function callAgent() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  const messages = [
    {
      role: "system",
      content:
        "You are a son of Arbaz. Your task is to help user to solve their problems.",
    },
  ];

  const tools = [
    {
      type: "function",
      function: {
        name: "getTotalExpense",
        description: "Get total expense from date to date.",
        parameters: {
          type: "object",
          properties: {
            from: {
              type: "string",
              description: "Start month to get expenses",
            },
            to: {
              type: "string",
              description: "End month to get expenses",
            },
          },
          required: ["from", "to"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "addExpense",
        description: "Add new expense in the database",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of expense. eg., Bought a Watch.",
            },
            amount: {
              type: "string",
              description: "The amount of expense",
            },
          },
          required: ["name", "amount"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "addIncome",
        description: "Add my monthly income in the database",
        parameters: {
          type: "object",
          properties: {
            income: {
              type: "string",
              description: "My monthly income that I can spent.",
            },
          },
          required: ["income"],
        },
      },
    },
  ];

  while (true) {
    const question = await rl.question("USER: ");
    console.log(question);
    if (question === "bye") {
      rl.close();
      break;
    }
    messages.push({
      role: "user",
      content: question,
    });
    while (true) {
      const completion = await groq.chat.completions.create({
        messages,
        model: "llama-3.3-70b-versatile",
        tools,
      });

      messages.push(completion.choices[0].message);

      const toolCalls = completion.choices[0].message.tool_calls;
      if (!toolCalls) {
        console.log("Assistant: ", completion.choices[0].message.content);
        break;
      }

      for (const tool of toolCalls) {
        const functionName = tool.function.name;
        const functionArgs = tool.function.arguments;

        let result = "";
        if (functionName === "getTotalExpense") {
          result = getTotalExpense(JSON.parse(functionArgs));
        } else if (functionName === "addExpense") {
          result = addExpense(JSON.parse(functionArgs));
        } else if (functionName === "addIncome") {
          result = addIncome(JSON.parse(functionArgs));
        }

        messages.push({
          role: "tool",
          content: result,
          tool_call_id: tool.id,
        });
      }
    }
  }
}

callAgent();

// Get Total Expanse
function getTotalExpense({ from, to }) {
  const expenses = expenseDB.reduce((acc, item) => acc + item.amount, 0);
  return `${expenses} INR`;
}

function addExpense({ name, amount }) {
  expenseDB.push({ name, amount });
  return "";
}

function addIncome({ income }) {
  salary = income;
  return `${salary} INR`;
}
