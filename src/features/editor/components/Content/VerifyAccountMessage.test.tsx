/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { VerifyAccountMessage } from './VerifyAccountMessage';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Toaster } from 'react-hot-toast';

describe('When component is mounted', () => {
  it('should display a warning message when not authorized', () => {
    render(<VerifyAccountMessage authorized={false} />);

    expect(
      screen.getByText(
        'Tu cuenta no está verificada. Por favor, verifica tu cuenta.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: 'Verificar',
      })
    ).toBeInTheDocument();
  });

  it('should not display a warning message when authorized', () => {
    render(<VerifyAccountMessage authorized={true} />);

    expect(
      screen.queryByText(
        'Tu cuenta no está verificada. Por favor, verifica tu cuenta.'
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: 'Verificar',
      })
    ).not.toBeInTheDocument();
  });
});

describe('When the user clicks on the verify button', () => {
  beforeEach(() => {
    render(
      <>
        <Toaster />
        <VerifyAccountMessage authorized={false} />
      </>
    );
  });

  it('should should display a success notification when the request is successful', async () => {
    const fn = jest.fn();

    const server = setupServer(
      rest.post('/auth/send-verify-account-email', (req, res, ctx) => {
        fn();
        return res(ctx.status(200));
      })
    );

    server.listen();

    const button = screen.getByRole('button', { name: 'Verificar' });
    fireEvent.click(button);

    expect(screen.getByLabelText('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('Te enviamos un correo para recuperar tu cuenta.')
      ).toBeInTheDocument();
    });

    expect(fn).toHaveBeenCalled();

    server.close();
  });

  it('should should display an error notification when the request is unsuccessful', async () => {
    const fn = jest.fn();

    const server = setupServer(
      rest.post('/auth/send-verify-account-email', (req, res, ctx) => {
        fn();
        return res(ctx.status(403));
      })
    );

    server.listen();

    const button = screen.getByRole('button', { name: 'Verificar' });
    fireEvent.click(button);

    expect(screen.getByLabelText('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(
          'Ha ocurrido un error al enviar el correo de verificación. Por favor, inténtalo de nuevo más tarde.'
        )
      ).toBeInTheDocument();
    });

    expect(fn).toHaveBeenCalled();

    server.close();
  });
});
