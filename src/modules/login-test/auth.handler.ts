import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import * as crypto from 'crypto';

const userPoolData = {
    UserPoolId: 'ap-northeast-2_Ul7NYddea',
    ClientId: '6l8va8f1jmgkni1hh5ij54o68m'
}

const clientSecret = '2nu888uqdpkd38sk0g7v7m1hh98bcpvg8k5vn1id81p94iv629u';

function getSecretHash(username: string, clientId: string, clientSecret: string) {
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(username + clientId);
    return hmac.digest('base64');
}

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        
        if (!body.username) {
            throw new Error('Username is required');
        }

        const { username, password, email } = body;
        const clientId = userPoolData.ClientId;
        const secretHash = getSecretHash(username, clientId, clientSecret);

        const result = await signUp({ 
            Username: username, 
            Password: password, 
            Email: email, 
            secretHash: secretHash 
        });

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ 
                message: error.message || '회원가입 처리에 실패했습니다.',
                error: error
            }),
        };
    }
};

export async function signUp({
    Username, 
    Password, 
    Email, 
    secretHash 
}: { 
    Username: string, 
    Password: string, 
    Email: string, 
    secretHash: string 
}): Promise<{ message: string }> {
    const client = new CognitoIdentityProviderClient({ region: "ap-northeast-2" }); // 적절한 리전으로 변경

    const command = new SignUpCommand({
        ClientId: userPoolData.ClientId,
        Username: Username,
        Password: Password,
        SecretHash: secretHash,
        UserAttributes: [
            {
                Name: 'email',
                Value: Email
            }
        ]
    });

    try {
        const response = await client.send(command);
        return { 
            message: `${Username}님, 회원 가입이 성공적으로 완료되었습니다.`
        };
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
}

// export async function signUpUser({
//     username, 
//     password, 
//     email, 
//     clientId 
// }: { 
//     username: string, 
//     password: string, 
//     email: string, 
//     clientId: string 
// }): Promise<{ message: string }> {
//     try {
//         // SECRET_HASH 계산
//         const secretHash = getSecretHash(username, clientId, clientSecret);

//         // signUp 파라미터 설정
//         const params = {
//             ClientId: clientId,
//             Username: username,
//             Password: password,
//             UserAttributes: [
//                 {
//                     Name: 'email',
//                     Value: email,
//                 },
//                 // 추가적으로 필요한 속성을 여기 추가
//             ],
//             ClientMetadata: {
//                 SECRET_HASH: secretHash,  // SECRET_HASH 값을 clientMetadata에 포함
//             },
//         };

//         // 회원가입 API 호출
//         const response = await cognito.signUp(params).promise();
//         console.log('SignUp Success:', response);
        
//     } catch (error) {
//         console.error('SignUp Error:', error);
//     }
// }

  // 회원가입 함수
//   export async function signUp({
//       Username, 
//       Password, 
//       Email, 
//       secretHash 
//   }: { 
//       Username: string, 
//       Password: string, 
//       Email: string, 
//       secretHash: string 
//   }): Promise<{ message: string }> {
  
//       // 이메일 속성 설정
//       const attributeData: AWSCognitoIdentity.ICognitoUserAttributeData = {
//           Name: 'email',
//           Value: Email,
//       };
  
//       let attributeList: AWSCognitoIdentity.CognitoUserAttribute[] = [
//           new AWSCognitoIdentity.CognitoUserAttribute(attributeData),
//       ];
  
//       // SECRET_HASH를 clientMetadata로 전달
//       const clientMetadata: AWSCognitoIdentity.ClientMetadata = {
//           SECRET_HASH: secretHash, // 'SECRET_HASH'를 clientMetadata에 추가
//       };
  
//       console.log('Client Metadata:', JSON.stringify(clientMetadata, null, 2));
  
//       return await new Promise((resolve, reject) => {
//           const userPool = new AWSCognitoIdentity.CognitoUserPool(userPoolData);
  
//           // signUp 호출 시, clientMetadata와 함께 SECRET_HASH 전달
//           userPool.signUp(Username, Password, attributeList, [], (err, result) => {
//               if (err) {
//                   reject({ message: err.message || JSON.stringify(err) });
//               } else {
//                   resolve({ message: result?.user.getUsername() + '님, 회원 가입이 성공적으로 완료되었습니다.' });
//               }
//           });
//       });
//   }