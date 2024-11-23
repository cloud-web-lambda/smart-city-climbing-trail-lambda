import axios from 'axios';
import express, { Request, Response } from 'express';
import qs from 'querystring';

const app = express();
app.use(express.json());

const cognitoDomain = 'https://climbing.auth.ap-northeast-2.amazoncognito.com';
const clientId = '1v44042vjr0kpvo5tm2fjb8fsf';
const clientSecret = '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';
const redirectUri = 'https://localhost:8080'; // Callback URL

app.post('/auth/callback', async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    // Cognito 토큰 엔드포인트에 POST 요청
    const tokenResponse = await axios.post(`${cognitoDomain}/oauth2/token`, qs.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, id_token, refresh_token } = tokenResponse.data;

    // 토큰 저장 또는 세션 생성
    res.json({ access_token, id_token, refresh_token });
  } catch (error) {
    console.error('Failed to exchange token:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
