// pages/gpt.js
import React from 'react';
import ChatInterface from '../../components/NovaChat';

export const metadata = { 
  title: 'NovaChat - AI Chat Interface for Interactive Conversations',
  description: "Explore NovaChat, an AI chat interface where you can interact with advanced AI models. Choose from various models, send prompts, and discover creative AI responses.",
  keywords: "AI Chat, NovaChat, NovaGPT, AI Models, Chatbot, Artificial Intelligence, AI Interaction, Model Selection, Creative AI Responses",
  author: "silentcosmo",
  robots: "index, follow",
  openGraph: {
    title: 'NovaChat - AI Chat Interface for Interactive Conversations',
    description: 'Explore NovaChat, an AI chat interface where you can interact with advanced AI models. Choose from various models, send prompts, and discover creative AI responses.',
    url: 'https://novaframe.netlify.app/chat',
    siteName: 'NovaChat',
    type: 'website',
  },
};

const GPTPage = () => {
  return (
    <div>
      <div className=''><ChatInterface /></div>
    </div>
  );
};

export default GPTPage;
