import fetch from "node-fetch";

async function run() {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "test", email: "nirajcs2023@gmail.com", password: "pwd", role: "admin" })
  });
  console.log(res.status);
  const text = await res.text();
  console.log(text);
}
run();
