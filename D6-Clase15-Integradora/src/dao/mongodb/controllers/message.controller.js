import Message from '../models/message.model.js';

const getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error al obtener el historial de chat:', error);
    res.status(500).json({ error: 'Error al obtener el historial de chat' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = new Message({ user, message });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error al enviar un mensaje:', error);
    res.status(500).json({ error: 'Error al enviar un mensaje' });
  }
};

export { getChatHistory, sendMessage };
