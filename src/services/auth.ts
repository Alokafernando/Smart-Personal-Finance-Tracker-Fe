import api from "./api"

type RegisterDataType = {
  username: string
  email: string
  password: string
  role: string
}

type SendOtpResponse = {
  message: string
}

type VerifyOtpData = {
  email: string
  otp: string
  newPassword: string
}

export const register = async (data: RegisterDataType) => {
  const res = await api.post("/auth/register", data)
  return res.data
}

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password })
  return res.data
}

export const getUserDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", { token: refreshToken })
  return res.data
}

export const passwordChangeHandle = async ( currentPassword: string, newPassword: string ) => {
  const res = await api.put("/auth/change-password", { currentPassword, newPassword})
  return res.data
}

export const adminRegister = async (data: RegisterDataType) => {
  const res = await api.post("/auth/admin/register", data)
  return res.data
}

export const sendOtp = async (email: string): Promise<SendOtpResponse> => {
  const res = await api.post("/auth/send-otp", { email })
  return res.data
}

export const verifyOtpAndResetPassword = async (data: VerifyOtpData) => {
  const res = await api.post("/auth/verify-otp", data)
  return res.data
}