// src/Api/Auth.js
export const loginAdmin = async (username, password) => {
    const response = await fetch("http://localhost:8082/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
    return await response.json(); // Se espera { token: "..." }
  };
  