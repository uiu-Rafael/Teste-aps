import { z } from 'zod';

// Esquema de validação para cliente
export const clientSchema = z.object({
  image: z.string().url({ message: 'URL da imagem inválida.' }),
  cnpj: z
    .string()
    .length(14, { message: 'CNPJ deve ter 14 caracteres.' })
    .regex(/^\d+$/, { message: 'CNPJ deve conter apenas números.' }),
  name: z.string().min(1, { message: 'Nome é obrigatório.' }).max(100),
  fantasyname: z
    .string()
    .min(1, { message: 'Nome fantasia é obrigatório.' })
    .max(100),
  cep: z
    .string()
    .length(8, { message: 'CEP deve ter 8 caracteres.' })
    .regex(/^\d+$/, { message: 'CEP deve conter apenas números.' }),
  logradouro: z
    .string()
    .min(1, { message: 'Logradouro é obrigatório.' })
    .max(100),
  bairro: z.string().min(1, { message: 'Bairro é obrigatório.' }).max(100),
  city: z.string().min(1, { message: 'Cidade é obrigatória.' }).max(100),
  uf: z
    .string()
    .length(2, { message: 'UF deve ter 2 caracteres.' })
    .regex(/^[A-Z]{2}$/, {
      message: 'UF é obrigatório.',
    }),
  complement: z.string().max(100).optional(),
  email: z.string().email({ message: 'Email inválido.' }).max(100),
  phone: z.string().regex(/^\d{10,15}$/, {
    message: 'Telefone deve ter entre 10 a 15 dígitos.',
  }),
});

// Esquema para validar parâmetros de rota (id)
export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number'),
});
