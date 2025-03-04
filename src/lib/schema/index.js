import * as z from "zod";

export const LoginSchema = z.object({
  phone: z
    .string()
    .refine((phone) => phone.slice(0, 4) === "+998", {
      message: ("Phone number must start with '+998'."),
    })
    .refine((phone) => phone.length === 13, {
      message: ("Telefon raqam noto'g'ri"),
    }),
  password: z.string().min(1, {
    message: "Please enter your password. Password is required.",
  }),
  data: z.any()
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email address, required.",
      }),
    phone: z
      .string()
      .refine((phone) => phone.slice(0, 4) === "+998", {
        message: ("Phone number must start with '+998'."),
      })
      .refine((phone) => phone.length === 13, {
        message: ("Telefon raqam noto'g'ri"),
      }),
    password: z.string().min(6, {
      message: "Please enter a password with at least 6 characters, required",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Please confirm your password, required.",
    }),
    data: z.any()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });

export const ChangePasswordSchema = z
  .object({
    id: z.number(),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


export const ChangePhoneSchema = z.object({
  id: z.number(),
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
  new_phone: z.string().min(1, "New phone number is required"),
})

// Schema for OTP verification
export const VerifyPhoneOtpSchema = z.object({
  id: z.number(),
  new_phone: z.string().min(1, "Phone number is required"),
  otp: z.string().min(1, "OTP is required"),
})


export const ResetPasswordSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  code: z.string().min(1, "SMS code is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const VerifySmsCodeSchema = z.object({
  phone_number: z.string().length(13),
  confirm_code: z.string().length(6),
  is_update: z.boolean().optional().default(false),
})

