import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/apiClient';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should sign in', async () => {
    const apiResponse = {
      user: {
        id: '525f9e5e-1da9-49f0-8157-3c2633172fd8',
        name: 'Alfredo',
        email: 'test@test.com',
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE5OTg3MTIsImV4cCI6MTU5MjA4NTExMiwic3ViIjoiNTI1ZjllNWUtMWRhOS00OWYwLTgxNTctM2MyNjMzMTcyZmQ4In0.OLgG4ThhqHpjLAtmj8OvANo-vimU8Nv6Bb1DGc0U23s',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'test@test.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItem).toHaveBeenCalledWith('@GoBarber:token', apiResponse.token);
    expect(setItem).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(apiResponse.user));
    expect(result.current.user.email).toEqual('test@test.com');
  });

  it('should restore saved user data from localstorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      switch (key) {
        case '@GoBarber:token':
          return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE5OTg3MTIsImV4cCI6MTU5MjA4NTExMiwic3ViIjoiNTI1ZjllNWUtMWRhOS00OWYwLTgxNTctM2MyNjMzMTcyZmQ4In0.OLgG4ThhqHpjLAtmj8OvANo-vimU8Nv6Bb1DGc0U23s';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '525f9e5e-1da9-49f0-8157-3c2633172fd8',
            name: 'Alfredo',
            email: 'test@test.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('test@test.com');
  });

  it('should sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      switch (key) {
        case '@GoBarber:token':
          return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE5OTg3MTIsImV4cCI6MTU5MjA4NTExMiwic3ViIjoiNTI1ZjllNWUtMWRhOS00OWYwLTgxNTctM2MyNjMzMTcyZmQ4In0.OLgG4ThhqHpjLAtmj8OvANo-vimU8Nv6Bb1DGc0U23s';
        case '@GoBarber:user':
          return JSON.stringify({
            id: '525f9e5e-1da9-49f0-8157-3c2633172fd8',
            name: 'Alfredo',
            email: 'test@test.com',
          });
        default:
          return null;
      }
    });
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItem).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should update user data', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: '525f9e5e-1da9-49f0-8157-3c2633172fd8',
      name: 'Alfredo',
      email: 'test@test.com',
      avatar_url: 'http://192.168.100.109:3333/files/7939e55f802d705451bf-alfed2.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItem).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(user));
    expect(result.current.user).toEqual(user);
  });
});
