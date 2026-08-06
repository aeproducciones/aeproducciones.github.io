# AE Producciones

Sitio oficial de AE Producciones: música en vivo, audio profesional,
coordinación técnica y soluciones integrales para eventos.

## Alcance de la V1

- Sitio en español bajo `/es`.
- Soluciones para bodas, hoteles, restaurantes y eventos corporativos.
- Servicios directos e integrados.
- Royal Music: Solista, Royal Trío y Unplugged.
- Formulario que registra una solicitud en el CRM y prepara una conversación
  por WhatsApp.
- Tarjeta digital ligera en `/conecta`, preparada para compartirse mediante QR.
- Arquitectura lista para incorporar inglés profesional, evidencia autorizada y
  casos reales en fases posteriores.

## Desarrollo

```bash
npm install
npm run dev
npm run build
npm test
```

El proyecto utiliza vinext y se publica mediante OpenAI Sites. La configuración
del proyecto de alojamiento se conserva en `.openai/hosting.json`.

## CRM

El CRM oficial vive en el mismo repositorio:

- `/crm`: tabla de prospectos.
- `/crm/prospectos/[id]`: expediente individual.
- `/api/crm/intake`: entrada pública del formulario.
- `/api/crm/prospectos`: lectura y administración protegida.

El runtime necesita estas variables secretas:

- `GOOGLE_SHEETS_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

La cuenta de servicio debe tener acceso de editor únicamente a la hoja de CRM.
