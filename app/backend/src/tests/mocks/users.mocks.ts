const bodyLogin = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const missingEmail = {
  password: 'secret_admin',
}

const missingPassword = {
  email: "admin@admin.com",
}

const invalidLogin = {
  email: "@admin.com",
  password: 123456
}

const invalidPassword = {
  email: "admin@admin.com",
  password: 12345
};  

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzgxNDY4NzYsImV4cCI6MTY3ODMxOTY3Nn0.Qj3MrG3D-PdF8JNcPOFcg3qT4khBR9oamRuCchJ33EU';

export { bodyLogin, missingEmail, missingPassword, invalidLogin, token, invalidPassword };