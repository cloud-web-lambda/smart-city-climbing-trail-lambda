// import jwt from 'jsonwebtoken';

// app.get('/protected-route', (req: Request, res: Response) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Token missing' });
//   }

//   try {
//     const decoded = jwt.verify(token, 'Cognito의 퍼블릭 키 또는 JWT 설정');
//     res.json({ data: 'Protected data', user: decoded });
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// });