// ================================
// CONFIGURACIÓN DE LA API
// ================================
// Cambiar esta URL cuando el backend esté en producción

export const API_BASE_URL = 'https://inndomitus-back.vercel.app'

// Endpoints disponibles
export const ENDPOINTS = {
  FORMULARIO_CONTACTO: '/api/formulario-contacto',
  CONFIGURACION_AGENTE: '/api/configuracion-agente',
  WHATSAPP_ENVIAR: '/api/whatsapp/enviar-mensaje',
  VOZ_LLAMADA: '/api/voz/iniciar-llamada',
}

// Función helper para hacer peticiones POST
export async function postData(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ mensaje: 'Error de conexión' }))
    throw new Error(error.mensaje || 'Error al enviar los datos')
  }

  return response.json()
}
