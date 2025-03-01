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
  provider: z.string().optional(),
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
    provider: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
  });
