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
  password: 12345
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc';

export { bodyLogin, missingEmail, missingPassword, invalidLogin, token };