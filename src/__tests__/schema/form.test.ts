import { describe, it, expect } from 'vitest';
import { formSchema } from '../../schema/form';

describe('formSchema validation', () => {
  const validFile = new File(['hello'], 'pic.png', { type: 'image/png' });

  const validData = {
    name: 'John',
    age: 25,
    email: 'john@example.com',
    password: 'Strong@123',
    confirmPassword: 'Strong@123',
    gender: 'male',
    terms: true,
    picture: [validFile],
    country: 'USA',
  };

  it('should pass with valid data', () => {
    const result = formSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail if name starts with lowercase', () => {
    const result = formSchema.safeParse({ ...validData, name: 'john' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      'First letter must be uppercase'
    );
  });

  it('should fail if passwords do not match', () => {
    const result = formSchema.safeParse({
      ...validData,
      confirmPassword: 'Mismatch123!',
    });
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((i) => i.message === 'Passwords must match')
    ).toBe(true);
  });

  it('should fail if file type is invalid', () => {
    const badFile = new File(['test'], 'pic.txt', { type: 'text/plain' });
    const result = formSchema.safeParse({ ...validData, picture: [badFile] });
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((i) => i.message.includes('Only .jpg or .png'))
    ).toBe(true);
  });

  it('should fail if terms not accepted', () => {
    const result = formSchema.safeParse({ ...validData, terms: false });
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((i) => i.message.includes('You must accept'))
    ).toBe(true);
  });
});
