import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../../store/useFormStore';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({ users: [] });
  });

  it('should initialize with empty users', () => {
    const state = useFormStore.getState();
    expect(state.users).toEqual([]);
  });

  it('should add a user', () => {
    const user = {
      id: '1',
      name: 'John Doe',
      age: 25,
      gender: 'male' as const,
      email: 'john@example.com',
      picture: 'avatar.png',
      country: 'USA',
    };

    useFormStore.getState().addUser(user);

    const state = useFormStore.getState();
    expect(state.users).toHaveLength(1);
    expect(state.users[0]).toEqual(user);
  });
});
