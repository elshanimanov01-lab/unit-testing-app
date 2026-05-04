import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm komponenti', () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    beforeEach(() => {
        mockSubmit.mockClear();
        render(<LoginForm onSubmit={mockSubmit} />);
    });

    describe('form render yoxlamalari', () => {
        test('basliq gosterilir', () => {
            expect(screen.getByRole('heading', { name: 'Daxil ol' })).toBeInTheDocument();

        });
        test('email sahesi render olur', () => {
            const emailInput = screen.getByLabelText('Email');
            expect(emailInput).toBeInTheDocument();
        });
        test('sifre sahesi render olur', () => {
            const passwordInput = screen.getByLabelText('Sifre');
            expect(passwordInput).toBeInTheDocument();
        });
        test('gonder duymesi render olur', () => {
            expect(screen.getByRole('button', { name: 'Daxil ol' })).toBeInTheDocument();
        });
        test('baslangicda xeta mesaji gosterilmir', () => {
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
        test('her iki sahe bos olduqda duyme disabled olur', () => {
            const button = screen.getByRole('button', { name: 'Daxil ol' });
        });
    });

    describe('form validasiyasi', () => {
        test('email doldurulub sifre bos olduqda xeta gosterilir', async () => {
            await user.type(screen.getByLabelText('Email'), 'test@mail.com');
            await user.click(screen.getByRole('button', { name: 'Daxil ol' }));

            expect(screen.getByRole('alert')).toHaveTextContent('Butun saheleri doldurun');

            expect(mockSubmit).not.toHaveBeenCalled();
        });
        test('qisa sifre ile gonderildikde xeta gosterilir', async () => {
            await user.type(screen.getByLabelText('Email'), 'test@mail.com');
            await user.type(screen.getByLabelText('Sifre'), '123');
            await user.click(screen.getByRole('button', { name: 'Dxail ol' }));

            expect(screen.getByRole('alert')).toHaveTextContent('Sifre min 6 simvol olmalidir!');
            expect(mockSubmit).not.toHaveBeenCalled();
        });
    });

    describe('ufurlu form gonderme', () => {

        test('duzgun melumatlarla onSumbit cagirilir', async () => {
            await user.type(screen.getByLabelText('Email'), 'user@test.com');
            await user.type(screen.getByLabelText('Sifre'), 'password123');

            await user.click(screen.getByRole('button', { name: 'Daxil ol' }));

            expect(mockSubmit).toHaveBeenCalledWith({
                email: 'user@test.com',
                password: 'password123',
            });

        });

        test('ugurlu gondermede onSubmit tam 1 defe cagirilir', async () => {
            await user.type(screen.getByLabelText('Email'), 'user@test.com');
            await user.type(screen.getByLabelText('Sifre'), 'password123');
            await user.click(screen.getByRole('button', { name: 'Dxail ol' }));

            expect(mockSubmit).toHaveBeenCalledTimes(1);
        });

        test('ugurlu gondermede xeta mesaji gosterilmir', async () => {
            await user.type(screen.getByLabelText('Email'), 'user@test.com');
            await user.type(screen.getByLabelText('Sifre'), 'password123');
            await user.click(screen.getByRole('button', { name: 'Dxail ol' }));
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });
    describe('input deyer yoxlamalari', () => {

        test('yazilan metn inputda gorunur', asyn() => {
            const emailInput = screen.getByLabelText('Email');
            await user.type(emailInput, 'test@mail.com');


            expect(emailInput).toHaveValue('test@mail.com');
        });
        test('en azi bir sahe doldurulduqda duyme enabled olur', async () => {
            await user.type(screen.getByLabelText('Email'), 't');

            expect(screen.getByRole('button', { name: 'daxil ol' })).toBeEnabled();
        });
    });


});
