  const handleInput = (input) => {
    showUserMessage(input);
    conversationState.history.push(input.toLowerCase().trim());
    inputField.value = '';
    inputField.disabled = true;

    setTimeout(() => {
      let response;
      let responseKey = null;
      const lowerCaseInput = input.toLowerCase().trim();

      if (lastBotQuestionKey) {
        if (affirmativeAnswers.includes(lowerCaseInput)) {
          switch (lastBotQuestionKey) {
            case 'presupuesto_offer':
              responseKey = 'presupuesto';
              break;
            case 'contact_offer':
              responseKey = 'contacto';
              break;
            case 'whatsapp_redirect':
              window.open("https://wa.me/5653915739", '_blank');
              response = {
                message: "¡Perfecto! Te estoy redirigiendo a WhatsApp. Si no se abre la ventana, puedes hacer clic aquí: <a href='https://wa.me/5653915739' target='_blank'>Abrir WhatsApp</a>"
              }
;
              break;
          }

        }
 else if (negativeAnswers.includes(lowerCaseInput)) {
          responseKey = "saludo";
        }

      }


      if (!response) {
        for (const intent in intents) {
          if (intents[intent].some(kw => lowerCaseInput.includes(kw))) {
            switch (intent) {
              case 'request_payment':
                responseKey = 'payment_info';
                break;
              case 'request_quote':
                responseKey = 'precios_menu';
                break;
              case 'request_contact':
                responseKey = 'contacto';
                break;
              case 'request_examples':
                responseKey = 'ejemplos';
                break;
              case 'frustration':
                responseKey = 'human_escalation';
                break;
              case 'request_service_info':
                responseKey = 'servicios_menu';
                break;
              case 'greet':
                responseKey = 'saludo';
                break;
              case 'request_online_presence_info':
                responseKey = 'presencia_internet';
                break;
              case 'request_cybersecurity_info':
                responseKey = 'ciberseguridad';
                break;
              case 'request_creator_info':
                responseKey = 'creator_info';
                break;
              case 'request_hours':
                responseKey = 'request_hours';
                break;
            }

            if (responseKey) break;
          }

        }

      }


      const history = conversationState.history;
      if (!response && !responseKey && history.length > 2) {
        const lastThree = history.slice(-3);
        if (lastThree[0] === lastThree[1] && lastThree[1] === lastThree[2]) {
          response = JSON.parse(JSON.stringify(knowledgeBase['human_escalation']));
          response.message = "Parece que no nos estamos entendiendo. " + response.message;
          conversationState.history = [];
        }

      }


      if (responseKey) {
        response = knowledgeBase[responseKey];
        misunderstandingCounter = 0;
        conversationState.userFrustration = 0;
      }
