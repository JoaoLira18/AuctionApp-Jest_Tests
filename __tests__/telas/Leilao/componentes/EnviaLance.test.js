import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { EnviaLance } from '../../../../src/telas/Leilao/componentes/EnviaLance.js'
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('telas/Leilao/componentes/EnviaLance', () => {

    it('must send a bid when press the button', async () => {

        const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))
        const {
            getByText,
            getByPlaceholderText,
            getByAccessibilityHint,
        } = render(
            <EnviaLance
                enviaLance={enviaLance}
                cor="blue"
            />
        )

        const input = getByPlaceholderText("R$");
        const button = getByAccessibilityHint("Enviar Lance");

        fireEvent.changeText(input, "10");
        fireEvent.press(button);

        expect(enviaLance).toHaveBeenCalledWith("10");
        await waitFor(() => {
            expect(getByText(ENVIADO)).toBeTruthy()
        })

        expect(() => getByText(NAO_ENVIADO)).toThrow();
    })
})

describe("testing enviaLance snapshot ", () => {

    it("must render correctly", () => {
        const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))
        const { toJSON } = render(
            <EnviaLance
                enviaLance={enviaLance}
                cor="blue"
            />
        )

        expect(toJSON()).toMatchSnapshot()
    })
})