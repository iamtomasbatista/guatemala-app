# Guatemala App

Aplicacion movil hibrida cliente de Guatemala Api. 

Permite autenticacion OAUTH2.0 y ver un listado de promociones. 

## Requerimientos

- @ionic/cli@6.10.1

## Instrucciones

- Instala las dependencias

```
npm install
```

- **IMPORTANTE** Valida que ya este [guatemala-api](https://github.com/iamtomasbatista/guatemala-api) corriendo en tu ambiente local 

- Levanta un servidor local

```
ionic serve
```

## Generar un build par iOS

- Permite ejecutar el build con Xcode

```
ionic capacitor add ios"
ionic capacitor open ios
```

## Generar un build par Android

- Permite ejecutar el build con Android SDK

```
ionic capacitor add android
ionic capacitor open android
```
