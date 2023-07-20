import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  description: yup.string().required(),
  category: yup.string().required(),
  user_id: yup.string().nullable(),
});
