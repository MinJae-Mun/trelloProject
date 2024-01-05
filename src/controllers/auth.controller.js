import { AuthService } from '../services/auth.service.js';

export class AuthController {
    authService = new AuthService();

    // 회원가입
    signup = async (req, res, next) => {
        try {
            const createAuthData = req.body;

            const isValidData =
                'userId' in createAuthData &&
                'password' in createAuthData &&
                'checkPassword' in createAuthData &&
                'name' in createAuthData;

            if (!isValidData) {
                const error = new Error('유효하지 않은 데이터입니다.');
                error.status = 400;
                throw error;
            }

            const result = await this.authService.signup(createAuthData);

            return res.status(201).json(result);
        } catch (err) {
            next(err);
        }
    };

    // 로그인
    signin = async (req, res, next) => {
        try {
            const signinData = req.body;

            const isValidData =
                'userId' in signinData && 'password' in signinData;

            if (!isValidData) {
                const error = new Error('유효하지 않은 데이터입니다.');
                error.status = 400;
                throw error;
            }

            const result = await this.authService.signin(signinData);
            res.cookie('user', result);
            return res.status(200).json({
                accessToken: 'Bearer ' + result,
            });
        } catch (err) {
            next(err);
        }
    };
}
