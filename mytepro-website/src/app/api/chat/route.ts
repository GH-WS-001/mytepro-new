import { NextRequest, NextResponse } from 'next/server';

// OpenAI API配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 检查API密钥
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // 解析请求体
    const body: ChatRequest = await request.json();
    const { messages, language = 'zh' } = body;

    // 验证消息格式
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // 添加系统消息，根据语言设置不同的角色
    const systemMessage: ChatMessage = {
      role: 'system',
      content: language === 'zh' 
        ? '你是一个专业的AI助手，为MytePro公司提供技术支持和咨询服务。请用中文回答用户的问题，保持专业、友好和有帮助的态度。如果用户询问关于VR数字孪生、3D建模或其他技术问题，请提供详细和准确的回答。'
        : 'You are a professional AI assistant providing technical support and consulting services for MytePro company. Please answer user questions in English, maintaining a professional, friendly, and helpful attitude. If users ask about VR digital twins, 3D modeling, or other technical questions, please provide detailed and accurate answers.'
    };

    // 构建发送给OpenAI的消息数组
    const apiMessages = [systemMessage, ...messages];

    // 调用OpenAI API
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    // 返回助手回复
    return NextResponse.json({
      message: {
        role: 'assistant',
        content: assistantMessage,
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running',
    status: 'ok',
  });
}