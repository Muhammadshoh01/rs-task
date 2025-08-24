import { useRef, useState } from 'react';
import { formSchema } from '../schema/form';
import type { FormData } from '../schema/form';
import { v4 as uuid } from 'uuid';
import { useFormStore } from '../store/useFormStore';
import { useCountryStore } from '../store/useCountryStore';
import { formItem, label, input, errorText, fileInput } from '../data/vars';
import { filterCountries, getPasswordStrength, toBase64 } from '../utils/utils';

function UncontrolledForm({ onClose }: { onClose: () => void }) {
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
        {}
    );

    const addUser = useFormStore((state) => state.addUser);
    const countries = useCountryStore((state) => state.countries);

    const [query, setQuery] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');

    const filtered = filterCountries(countries, query);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = formRef.current!;
        const formData = new FormData(form);

        const rawData = {
            name: formData.get('name'),
            age: Number(formData.get('age')),
            gender: formData.get('gender'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            country: country || formData.get('country'),
            terms: formData.get('terms') === 'on',
            picture: formData.getAll('picture'),
        };

        const parsed = formSchema.safeParse(rawData);

        if (!parsed.success) {
            const newErrors: Partial<Record<keyof FormData, string>> = {};
            parsed.error.issues.forEach((err) => {
                const field = err.path[0] as keyof FormData;
                newErrors[field] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        const pictureFile = rawData.picture[0] as File;
        const base64Picture = await toBase64(pictureFile);

        addUser({
            id: uuid(),
            ...parsed.data,
            picture: base64Picture,
        });

        setErrors({});
        form.reset();
        setPassword('');
        onClose();
    }

    const passwordStrength = getPasswordStrength(password);

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-lg w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl"
        >
            <div className={formItem}>
                <label htmlFor="name" className={label}>
                    Name
                </label>
                <input type="text" id="name" name="name" className={input} />
                <p className={errorText}>{errors.name || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="age" className={label}>
                    Age
                </label>
                <input type="number" id="age" name="age" className={input} />
                <p className={errorText}>{errors.age || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <p className={label}>Gender</p>
                <div className="flex gap-4">
                    <label className="flex gap-1 items-center" htmlFor='male' >
                        <input type="radio" name="gender" value="male" id='male' /> Male
                    </label>
                    <label className="flex gap-1 items-center" htmlFor='female'>
                        <input type="radio" name="gender" value="female" id='female' /> Female
                    </label>
                </div>
                <p className={errorText}>{errors.gender || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="country" className={label}>
                    Select country
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        setQuery(e.target.value);
                    }}
                    className={input}
                    autoComplete="off"
                />
                {filtered.length > 0 && (
                    <ul className="border mt-1 rounded-lg bg-white shadow-lg max-h-40 overflow-y-auto">
                        {filtered.map((c) => (
                            <li
                                key={c.code}
                                onClick={() => {
                                    setCountry(c.code);
                                    setQuery('');
                                }}
                                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                            >
                                {c.name}
                            </li>
                        ))}
                    </ul>
                )}
                <p className={errorText}>{errors.country || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="email" className={label}>
                    Email
                </label>
                <input type="email" id="email" name="email" className={input} />
                <p className={errorText}>{errors.email || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="password" className={label}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className={input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className={errorText}>{errors.password || '\u00A0'}</p>
                {password && (
                    <p
                        className={`text-sm ${passwordStrength === 'weak'
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
                <label htmlFor="confirmPassword" className={label}>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={input}
                />
                <p className={errorText}>{errors.confirmPassword || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="picture" className={label}>
                    Profile Picture
                </label>
                <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept="image/png, image/jpeg"
                    className={fileInput}
                />
                <p className={errorText}>{errors.picture || '\u00A0'}</p>
            </div>

            <div className={formItem}>
                <label htmlFor="terms" className="flex gap-2 items-center">
                    <input type="checkbox" id="terms" name="terms" /> Accept Terms and
                    Conditions
                </label>
                <p className={errorText}>{errors.terms || '\u00A0'}</p>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
}

export default UncontrolledForm;
