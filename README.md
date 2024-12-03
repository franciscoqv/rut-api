# rut-api
API que transforma un RUT desde un formato a otro. Ejemplo: 12.345.678-9 → 123456789

Actualmente sólo hay un endpoint disponible y se llama "Rut with DV", el que funciona recibiendo un rut con dígito verificador. Da igual si incluye puntos o guión porque lo primero que hace el código es eliminar todo eso. Adicionalmente, elimina cualquier cero inicial (a la izquierda) del RUT (e.g., 0123456-7 lo considera como 123456-7 para efectos de las modificaciones que realiza sobre los RUTs.)

Al llamar al endpoint, se debe seleccionar el tipo de respuesta que se desea. Existen cuatro opciones:
- Type 1: 12345678-9
- Type 2: 12.345.678-9
- Type 3: 123456789
- Type 4: 12345678


## Ejemplos de llamada
### Ejemplo A
```
 curl -X POST https://rut-api.vercel.app/api/rut_with_dv -H "Content-Type: application/json" -d '{"RUT":"12345678-9", "type": 2}'
```

Respuesta:
```
{"formattedRUT":"12.345.678-9"}
```

### Ejemplo B
```
 curl -X POST https://rut-api.vercel.app/api/rut_with_dv -H "Content-Type: application/json" -d '{"RUT":"000012345678-9", "type": 2}'
```

Respuesta:
```
{"formattedRUT":"12.345.678-9"}
```


### Ejemplo C
```
 curl -X POST https://rut-api.vercel.app/api/rut_with_dv -H "Content-Type: application/json" -d '{"RUT":"000012345678-9", "type": 3}'
```

Respuesta:
```
{"formattedRUT":"123456789"}
```
