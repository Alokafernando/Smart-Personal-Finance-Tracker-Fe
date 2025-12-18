import api from "./api"

export type OCRTransaction = {
  _id: string
  user_id: string
  category_id?: string
  amount: number
  date: string
  type: "INCOME" | "EXPENSE"
  merchant?: string
  raw_text?: string
  ai_category?: string
}

export type OCRResponse = {
  message: string;
  transaction: OCRTransaction
}

export const uploadReceiptOCR = async (file: File) => {
  const formData = new FormData();
  formData.append("receipt", file); // ✅ must match backend

  const res = await api.post<OCRResponse>(
    "/ocr/receipt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}
