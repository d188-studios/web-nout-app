/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-render-in-setup */
import {
  fireEvent,
  Matcher,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { SignInForm } from './SignInForm';
import { BrowserRouter } from 'react-router-dom';

async function expectErrorMessageToBeInTheDocument(id: Matcher) {
  await waitFor(() => {
    expect(screen.getByText(id)).toBeInTheDocument();
  });
}

function changeInput(inputElement: any, value: string) {
  fireEvent.change(inputElement, { target: { value } });
}

describe('Sign in form is render correctly', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignInForm onFinish={jest.fn()} error={null} loading={false} />
      </BrowserRouter>
    );
  });

  it('should render a sign in form on the page with "Iniciar sesión" title', () => {
    expect(
      screen.getByRole('heading', { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it('should have a username with "Nombre de usuario" placeholder', () => {
    expect(
      screen.getByPlaceholderText(/Nombre de usuario/i)
    ).toBeInTheDocument();
  });

  it('should have a password with "Contraseña" placeholder', () => {
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
  });

  it('should have a sign in button with "Iniciar sesión" text.', () => {
    expect(
      screen.getByRole('button', { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it('should have a sign up link with "Registrate" text.', () => {
    expect(
      screen.getByRole('link', { name: /Registrate/i })
    ).toBeInTheDocument();
  });

  it('should have a forgot password link with "¿Olvidaste tu contraseña?" text.', () => {
    expect(
      screen.getByRole('link', { name: /¿Olvidaste tu contraseña?/i })
    ).toBeInTheDocument();
  });
});

describe('Sign in form has validation errors', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignInForm onFinish={jest.fn()} error={null} loading={false} />
      </BrowserRouter>
    );
  });

  it('should have username validation errors', async () => {
    const usernameInput = screen.getByPlaceholderText(/Nombre de usuario/i);

    changeInput(
      usernameInput,
      `Really long username that is longer than the max length of the field`
    );

    await expectErrorMessageToBeInTheDocument(
      /El nombre de usuario no puede tener más de 32 caracteres./i
    );

    await expectErrorMessageToBeInTheDocument(
      /El nombre de usuario solo puede contener letras, números y guiones bajos./i
    );

    changeInput(usernameInput, '');

    await expectErrorMessageToBeInTheDocument(
      /El nombre de usuario es requerido./i
    );
  });

  it('should have password validation errors', async () => {
    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);

    changeInput(passwordInput, '12345');

    await expectErrorMessageToBeInTheDocument(
      /La contraseña debe tener al menos 6 caracteres./i
    );

    changeInput(passwordInput, '');

    await expectErrorMessageToBeInTheDocument(/La contraseña es requerida./i);
  });

  it('should display required errors when the submit button is pressed.', async () => {
    const submitButton = screen.getByRole('button', {
      name: /Iniciar sesión/i,
    });

    fireEvent.click(submitButton);

    await expectErrorMessageToBeInTheDocument(
      /El nombre de usuario es requerido./i
    );

    await expectErrorMessageToBeInTheDocument(/La contraseña es requerida./i);
  });
});

describe('Sign in form works correctly', () => {
  it('should call onFinish when the submit button is pressed.', async () => {
    const onFinish = jest.fn();

    render(
      <BrowserRouter>
        <SignInForm onFinish={onFinish} error={null} loading={false} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', {
      name: /Iniciar sesión/i,
    });

    const usernameInput = screen.getByPlaceholderText(/Nombre de usuario/i);
    const passwordInput = screen.getByPlaceholderText(/Contraseña/i);

    changeInput(usernameInput, 'username');
    changeInput(passwordInput, 'password');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    expect(onFinish).toHaveBeenCalledWith({
      username: 'username',
      password: 'password',
    });
  });

  it('Should display a loading spinner when the submit button is pressed.', async () => {
    const onFinish = jest.fn();

    render(
      <BrowserRouter>
        <SignInForm onFinish={onFinish} error={null} loading />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', {
      name: /Iniciar sesión/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    });
  });

  it('should display an error message when error is not null.', async () => {
    const onFinish = jest.fn();

    render(
      <BrowserRouter>
        <SignInForm
          onFinish={onFinish}
          error={new Error('Ha ocurrido un error al iniciar sesión.')}
          loading={false}
        />
      </BrowserRouter>
    );

    await expectErrorMessageToBeInTheDocument(
      /Ha ocurrido un error al iniciar sesión./i
    );
  });
});
