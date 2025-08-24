import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import type { FormData } from '../schema/form';
import { formSchema } from '../schema/form';
import { useFormStore } from '../store/useFormStore';
import { v4 as uuid } from 'uuid';
import { useCountryStore } from '../store/useCountryStore';
import { formItem, label, input, errorText, fileInput } from '../data/vars';
import { getPasswordStrength, toBase64, filterCountries } from '../utils/utils';

function ReactHookForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const addUser = useFormStore((state) => state.addUser);
  const countries = useCountryStore((state) => state.countries);

  const [query, setQuery] = useState('');
  const filtered = filterCountries(countries, query);

  const getConfirmPasswordError = () => {
    if (errors.confirmPassword) {
      return errors.confirmPassword.message;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      return 'Passwords must watch';
    }
    return null;
  };
  async function onSubmit(data: FormData) {
    const pictureFile = data.picture[0];
    const base64Picture = await toBase64(pictureFile);
    const newUser = {
      id: uuid(),
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      country: data.country,
      picture: base64Picture,
    };
    addUser(newUser);
    reset();
    onClose();
  }

  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const confirmPasswordError = getConfirmPasswordError();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl"
    >
      <div className={formItem}>
        <label
          htmlFor="name"
          className={label}
          aria-describedby={errors.name ? 'name-error' : undefined}
        >
          Name
        </label>
        <input type="text" id="name" {...register('name')} className={input} />
        <p id="name-error" className={errorText}>
          {errors.name?.message || '\u00A0'}
        </p>
      </div>

      <div className={formItem}>
        <label htmlFor="age" className={label}>
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
          className={input}
        />
        <p className={errorText}>{errors.age?.message || '\u00A0'}</p>
      </div>
      <div className={formItem}>
        <p className={label}>Gender</p>
        <div className="flex gap-4">
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              id="male"
              {...register('gender')}
              value={'male'}
            />
            Male
          </label>
          <label className="flex gap-1 items-center">
            <input
              type="radio"
              id="female"
              {...register('gender')}
              value={'female'}
            />
            Female
          </label>
        </div>
        <p className={errorText}>{errors.gender?.message || '\u00A0'}</p>
      </div>
      <div className={formItem}>
        <label htmlFor="country" className={label}>
          Select country
        </label>
        <input
          type="text"
          id="country"
          role="combobox"
          className={input}
          aria-autocomplete="list"
          aria-controls="country-listbox"
          autoComplete="off"
          {...register('country')}
          value={watch('country') || ''}
          onChange={(e) => {
            const val = e.target.value;
            setValue('country', val, { shouldValidate: true });
            setQuery(val);
          }}
        />

        {filtered.length > 0 && (
          <ul
            id="country-listbox"
            role="listbox"
            className="border mt-1 rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto"
          >
            {filtered.map((c) => (
              <li
                key={c.code}
                role="option"
                aria-selected={watch('country') === c.code}
                onClick={() => {
                  setValue('country', c.code, { shouldValidate: true });
                  setQuery('');
                }}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
        <p className={errorText}>{errors.country?.message || '\u00A0'}</p>
      </div>

      <div className={formItem}>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={input}
        />
        {<p className={errorText}>{errors.email?.message || '\u00A0'}</p>}
      </div>

      <div className={formItem}>
        <label htmlFor="password" className={label}>
          Password
        </label>
        <input
          autoComplete="new-password"
          type="password"
          id="password"
          {...register('password')}
          className={input}
        />
        {<p className={errorText}>{errors.password?.message || '\u00A0'}</p>}
        {passwordStrength && (
          <p
            className={`text-sm mt-1 ${
              passwordStrength === 'weak'
                ? 'text-red-500'
                : passwordStrength === 'medium'
                  ? 'text-orange-500'
                  : 'text-green-600'
            }`}
          >
            Strength: {passwordStrength}
          </p>
        )}
      </div>

      <div className={formItem}>
        <label htmlFor="confirm_password" className={label}>
          Confirm password
        </label>
        <input
          autoComplete="new-password"
          type="password"
          id="confirm_password"
          {...register('confirmPassword', { deps: ['password'] })}
          className={input}
        />
        {<p className={errorText}>{confirmPasswordError || '\u00A0'}</p>}
      </div>

      <div className={formItem}>
        <label htmlFor="picture" className={label}>
          Profile Picture
        </label>
        <input
          type="file"
          id="picture"
          {...register('picture')}
          accept="image/png, image/jpeg"
          className={fileInput}
        />
        {typeof errors.picture?.message === 'string' && (
          <p className={errorText}>{errors.picture.message}</p>
        )}
        <br />
      </div>

      <div className={formItem}>
        <label className="flex items-center gap-2" htmlFor="terms">
          <input id="terms" type="checkbox" {...register('terms')} />
          Accept Terms and Conditions
        </label>
        {<p className={errorText}>{errors.terms?.message || '\u00A0'}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
}

export default ReactHookForm;
