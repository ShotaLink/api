// api/proxy.js
export default async function handler(req, res) {
  // Habilitar CORS para que tu página pueda llamar a esta función
  res.setHeader('Access-Control-Allow-Origin', '*'); // En producción, cámbialo por tu dominio exacto
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Si es una petición OPTIONS (preflight), respondemos OK
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { uid } = req.query; // Recibe el uid que le pasa tu página
  if (!uid) {
    return res.status(400).json({ error: 'Falta el uid' });
  }

  try {
    // Tu función hace la petición a la API original
    const apiResponse = await fetch(`https://info-ob49.vercel.app/api/account/?uid=${uid}`);
    const data = await apiResponse.json();
    
    // Devuelve el JSON a tu página
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al contactar la API original' });
  }
}
