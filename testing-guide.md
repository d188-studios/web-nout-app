# Guia de React testing

## Requerimientos

Antes de hacer tests con React, debes de tener instaladas las siguientes dependencias:

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom)
- [@testing-library/user-event](https://testing-library.com/docs/user-event/intro)
- [@testing-library/react-hooks](https://react-hooks-testing-library.com/installation)

## Instalacion con `create-react-app`

Si usaste `create-react-app` no requieres ninguna configuración adicional. El proyecto ya tiene la mayoría de las dependencias instaladas.

Ejecuta el siguiente comando para instalar las dependencias faltantes:

```bash
npm install --save-dev @testing-library/react-hooks
```

Una vez que se haya instalado, ejecuta el siguiente comando para ejecutar los tests:

```bash
npm run test
```

Esto ejecutará los tests en modo `watch`, es decir, se ejecutarán cada vez que se haga un cambio en el código.

## Instalacion manual

TODO
