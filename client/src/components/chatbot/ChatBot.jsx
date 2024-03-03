import React, { useEffect } from 'react';

const FlowiseChatbot = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js';
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
          window.Chatbot.init({
            chatflowid: "1a530f31-bd46-4c71-b887-5fdba994028b",
            apiHost: "https://sabrinav-teamwork.hf.space",
            chatflowConfig: {
            },
            theme: {
              // Configurações de tema do chatbot
              button: {
                backgroundColor: '#db55be',
                right: 5,
                bottom: 20,
                size: 'medium',
                iconColor: 'white',
                // customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
              },
              chatWindow: {
                welcomeMessage: 'Seja bem vindo(a) ao chatbot da TeamWork! Qualquer dúvida sobre desigualdade social, pode esclarecer aqui.',
                backgroundColor: '#ffffff',
                height: 470,
                width: 175,
                fontSize: 16,
                poweredByTextColor: '#e47e0d',
                botMessage: {
                  backgroundColor: '##e47e0d',
                  textColor: '#303235',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
                },
                userMessage: {
                  backgroundColor: '#db55be',
                  textColor: '#ffffff',
                  showAvatar: true,
                  avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
                },
                textInput: {
                  placeholder: 'O que é a desigualdade social?',
                  backgroundColor: '#ffffff',
                  textColor: '#303235',
                  sendButtonColor: '#3B81F6',
                },
              },
            },
            // Outras configurações do chatbot
            // ...
          });
        };
      } catch (error) {
        console.error('Erro ao buscar informações', error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default FlowiseChatbot;