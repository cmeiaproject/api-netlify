const supabase = require('../connect/supaconnect')

exports.handler = async function(event, context) {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método não permitido' }),
    };
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Corpo da requisição inválido. Deve ser JSON.' }),
    };    
  }

  const { appkey } = body

  if (!appkey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Parâmetro App Key é obrigatório' }),
    };
  }

  const { data, error } = await supabase
    .from('vw_app_users')
    .select('expired, keyactive, clientactive, key, appname')
    .eq('key', appkey)
    .single(); // espera apenas 1 resultado

  if (error || !data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Chave não encontrada' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
