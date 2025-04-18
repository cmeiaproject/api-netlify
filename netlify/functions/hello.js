exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Olá! Sua API está funcionando!" }),
    };
  };
  